'use strict';
require('dotenv').config();
const { pool } = require('../lib/server/db.cjs');

const migrations = [
  `CREATE TABLE IF NOT EXISTS contacts (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(255) NOT NULL,
    phone        VARCHAR(20),
    company      VARCHAR(100),
    subject      VARCHAR(200) NOT NULL,
    message      TEXT NOT NULL,
    interest     VARCHAR(50),
    source       VARCHAR(50)  DEFAULT 'technologist',
    ip_address   INET,
    status       VARCHAR(20)  DEFAULT 'new',
    admin_notes  TEXT,
    created_at   TIMESTAMPTZ  DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS analytics_pageviews (
    id          SERIAL PRIMARY KEY,
    page        VARCHAR(255) NOT NULL,
    referrer    VARCHAR(500),
    user_agent  TEXT,
    session_id  VARCHAR(100),
    ip_address  INET,
    created_at  TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS analytics_events (
    id          SERIAL PRIMARY KEY,
    event_type  VARCHAR(100) NOT NULL,
    event_data  JSONB        DEFAULT '{}',
    session_id  VARCHAR(100),
    ip_address  INET,
    created_at  TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_contacts_email     ON contacts(email)`,
  `CREATE INDEX IF NOT EXISTS idx_contacts_created   ON contacts(created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_contacts_status    ON contacts(status)`,
  `CREATE INDEX IF NOT EXISTS idx_analytics_page     ON analytics_pageviews(page)`,
  `CREATE INDEX IF NOT EXISTS idx_analytics_session  ON analytics_pageviews(session_id)`,
  `CREATE INDEX IF NOT EXISTS idx_events_type        ON analytics_events(event_type)`,
];

async function migrate() {
  console.log('\n🔄  ABN Technologist — running migrations...\n');
  let ok = 0;
  for (const sql of migrations) {
    const label = sql.trim().split('\n')[0].slice(0, 72);
    try { await pool.query(sql); console.log(`  ✅  ${label}`); ok++; }
    catch (e) { console.error(`  ❌  ${label}\n      ${e.message}`); }
  }
  console.log(`\n✅  ${ok}/${migrations.length} statements applied\n`);
  await pool.end();
}

migrate().catch(e => { console.error(e); process.exit(1); });
