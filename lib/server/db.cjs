'use strict';

const { Pool } = require('pg');

const globalForDb = global;

function createPool() {
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'abn_technologist',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true' || hasDatabaseUrl ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
}

const pool = globalForDb.__abnPool || createPool();

if (!globalForDb.__abnPool) {
  pool.on('error', (err) => {
    console.error('[DB] Unexpected client error:', err);
  });

  globalForDb.__abnPool = pool;
}

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  withTransaction: async (fn) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await fn(client);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },
};
