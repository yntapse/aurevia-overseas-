import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { ensureDatabase, query } from './db.js';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'change_this_secret';

const app = express();

app.use(cors());
app.use(express.json());

// Don't wait for database on startup - only when needed
let dbInitError = null;

const createSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const normalizeArrayField = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim().length > 0) {
    return value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [];
};

const normalizeProduct = (row) => ({
  ...row,
  features: Array.isArray(row.features) ? row.features : [],
  countries_served: Array.isArray(row.countries_served) ? row.countries_served : [],
});

const getAuthToken = (req) => {
  const value = req.headers.authorization || '';
  const [type, token] = value.split(' ');
  if (type !== 'Bearer' || !token) {
    return '';
  }
  return token;
};

const requireAdminAuth = (req, res, next) => {
  const token = getAuthToken(req);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Please login as admin.' });
  }

  try {
    const payload = jwt.verify(token, ADMIN_JWT_SECRET);
    req.admin = payload;
    return next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
  }
};

const ensureUniqueSlug = async (slug, excludeId) => {
  let candidate = slug;
  let suffix = 1;

  while (true) {
    const result = await query(
      `SELECT id FROM products WHERE slug = $1 ${excludeId ? 'AND id <> $2' : ''} LIMIT 1`,
      excludeId ? [candidate, excludeId] : [candidate],
    );

    if (result.rowCount === 0) {
      return candidate;
    }

    candidate = `${slug}-${suffix}`;
    suffix += 1;
  }
};

const ensureDbMiddleware = async (_req, res, next) => {
  try {
    await ensureDatabase();
    next();
  } catch (error) {
    console.error('Database initialization failed:', error);
    res.status(500).json({ message: 'Database is not available' });
  }
};

app.use('/api', ensureDbMiddleware);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  // Fast JWT generation without database access
  const token = jwt.sign({ role: 'admin', username }, ADMIN_JWT_SECRET, {
    expiresIn: '12h',
    jwtid: randomUUID(),
  });

  res.set('Content-Type', 'application/json');
  return res.json({ token, message: 'Login successful' });
});

app.get('/api/admin/verify', requireAdminAuth, (_req, res) => {
  return res.json({ ok: true });
});

app.post('/api/admin/logout', requireAdminAuth, (_req, res) => {
  return res.json({ message: 'Logged out' });
});

// Middleware to ensure database is initialized (only for product endpoints)
const ensureDb = async (_req, res, next) => {
  try {
    await ensureDatabase();
    next();
  } catch (error) {
    console.error('Database initialization failed:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
};

app.get('/api/products', ensureDb, async (_req, res) => {
  const result = await query(
    `SELECT id, name, slug, category, description, image_url, features, packaging_options, moq,
            countries_served, shelf_life, grades, display_order, created_at, updated_at
     FROM products
     ORDER BY display_order ASC, created_at ASC`,
  );

  return res.json(result.rows.map(normalizeProduct));
});

app.get('/api/products/:slug', ensureDb, async (req, res) => {
  const result = await query(
    `SELECT id, name, slug, category, description, image_url, features, packaging_options, moq,
            countries_served, shelf_life, grades, display_order, created_at, updated_at
     FROM products
     WHERE slug = $1
     LIMIT 1`,
    [req.params.slug],
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json(normalizeProduct(result.rows[0]));
});

app.post('/api/products', requireAdminAuth, ensureDb, async (req, res) => {
  const payload = req.body || {};

  if (!payload.name || !payload.description || !payload.category) {
    return res.status(400).json({ message: 'name, description and category are required' });
  }

  const baseSlug = createSlug(payload.slug || payload.name || 'product');
  const slug = await ensureUniqueSlug(baseSlug);
  const now = new Date().toISOString();

  const result = await query(
    `INSERT INTO products (
      id, name, slug, category, description, image_url, features,
      packaging_options, moq, countries_served, shelf_life, grades,
      display_order, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7::jsonb,
      $8, $9, $10::jsonb, $11, $12,
      $13, $14::timestamptz, $15::timestamptz
    )
    RETURNING id, name, slug, category, description, image_url, features, packaging_options, moq,
              countries_served, shelf_life, grades, display_order, created_at, updated_at`,
    [
      randomUUID(),
      payload.name,
      slug,
      payload.category,
      payload.description,
      payload.image_url || '',
      JSON.stringify(normalizeArrayField(payload.features)),
      payload.packaging_options || '',
      payload.moq || '',
      JSON.stringify(normalizeArrayField(payload.countries_served)),
      payload.shelf_life || '',
      payload.grades || '',
      Number(payload.display_order || 1),
      now,
      now,
    ],
  );

  return res.status(201).json(normalizeProduct(result.rows[0]));
});

app.put('/api/products/:id', requireAdminAuth, ensureDb, async (req, res) => {
  const existingResult = await query(
    `SELECT id, name, slug, category, description, image_url, features, packaging_options, moq,
            countries_served, shelf_life, grades, display_order, created_at, updated_at
     FROM products
     WHERE id = $1
     LIMIT 1`,
    [req.params.id],
  );

  if (existingResult.rowCount === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const existing = normalizeProduct(existingResult.rows[0]);
  const payload = req.body || {};

  const baseSlug = createSlug(payload.slug || payload.name || existing.name || 'product');
  const slug = await ensureUniqueSlug(baseSlug, req.params.id);

  const result = await query(
    `UPDATE products
     SET name = $1,
         slug = $2,
         category = $3,
         description = $4,
         image_url = $5,
         features = $6::jsonb,
         packaging_options = $7,
         moq = $8,
         countries_served = $9::jsonb,
         shelf_life = $10,
         grades = $11,
         display_order = $12,
         updated_at = NOW()
     WHERE id = $13
     RETURNING id, name, slug, category, description, image_url, features, packaging_options, moq,
               countries_served, shelf_life, grades, display_order, created_at, updated_at`,
    [
      payload.name ?? existing.name,
      slug,
      payload.category ?? existing.category,
      payload.description ?? existing.description,
      payload.image_url ?? existing.image_url,
      JSON.stringify(normalizeArrayField(payload.features ?? existing.features)),
      payload.packaging_options ?? existing.packaging_options,
      payload.moq ?? existing.moq,
      JSON.stringify(normalizeArrayField(payload.countries_served ?? existing.countries_served)),
      payload.shelf_life ?? existing.shelf_life,
      payload.grades ?? existing.grades,
      Number(payload.display_order ?? existing.display_order ?? 1),
      req.params.id,
    ],
  );

  return res.json(normalizeProduct(result.rows[0]));
});

app.delete('/api/products/:id', requireAdminAuth, ensureDb, async (req, res) => {
  const result = await query('DELETE FROM products WHERE id = $1', [req.params.id]);

  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(204).send();
});

export const ensureDbReady = async () => {
  // For API startup: don't require database init, let it happen on first product request
  return Promise.resolve();
};

export default app;
