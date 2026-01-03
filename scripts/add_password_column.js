
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const migration = `
DO $$
BEGIN
    ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
EXCEPTION
    WHEN duplicate_column THEN RAISE NOTICE 'column already exists';
END $$;
`;

async function run() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL not found in .env.local");
    }
    await client.connect();
    console.log("Connected to DB");
    await client.query(migration);
    console.log("Password column added successfully!");
  } catch (e) {
    console.error("Migration failed:", e);
  } finally {
    await client.end();
  }
}

run();
