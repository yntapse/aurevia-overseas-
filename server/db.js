import { Pool } from 'pg';
import { seedProducts } from './seedProducts.js';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required. Configure it in your environment.');
}

const shouldUseSSL = process.env.PGSSL_DISABLE !== 'true';

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: shouldUseSSL ? { rejectUnauthorized: false } : undefined,
});

let initialized = false;
let initializePromise;

const insertSeedProduct = async (client, product) => {
  await client.query(
    `INSERT INTO products (
      id, name, slug, category, description, image_url, features,
      packaging_options, moq, countries_served, shelf_life, grades,
      display_order, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7::jsonb,
      $8, $9, $10::jsonb, $11, $12,
      $13, $14::timestamptz, $15::timestamptz
    )`,
    [
      product.id,
      product.name,
      product.slug,
      product.category,
      product.description,
      product.image_url,
      JSON.stringify(product.features || []),
      product.packaging_options,
      product.moq,
      JSON.stringify(product.countries_served || []),
      product.shelf_life,
      product.grades,
      product.display_order,
      product.created_at,
      product.updated_at,
    ],
  );
};

const initializeDatabase = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        features JSONB NOT NULL DEFAULT '[]'::jsonb,
        packaging_options TEXT,
        moq TEXT,
        countries_served JSONB NOT NULL DEFAULT '[]'::jsonb,
        shelf_life TEXT,
        grades TEXT,
        display_order INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const countResult = await client.query('SELECT COUNT(*)::int AS count FROM products');
    const total = countResult.rows[0]?.count ?? 0;

    if (total === 0) {
      for (const product of seedProducts) {
        await insertSeedProduct(client, product);
      }
    }

    await client.query('COMMIT');
    initialized = true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const ensureDatabase = async () => {
  if (initialized) {
    return;
  }

  if (!initializePromise) {
    initializePromise = initializeDatabase().catch((error) => {
      initializePromise = undefined;
      throw error;
    });
  }

  await initializePromise;
};

export const query = (text, params = []) => pool.query(text, params);
