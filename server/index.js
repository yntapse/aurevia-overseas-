import 'dotenv/config.js';
import app, { ensureDbReady } from './app.js';

const PORT = process.env.PORT || 3001;

ensureDbReady()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Product API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize DB', error);
    process.exit(1);
  });
