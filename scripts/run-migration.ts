/**
 * Script to run database migrations
 *
 * Usage: npm run migrate
 */

import { Pool } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
config({ path: path.join(__dirname, "../.env.local") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env.local");
}

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
  const migrationPath = path.join(__dirname, "../migrations/003_create_usage_table.sql");
  const sql = fs.readFileSync(migrationPath, "utf-8");

  console.log("🔄 Running migration: 003_create_usage_table.sql");

  try {
    await db.query(sql);
    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  } finally {
    await db.end();
  }
}

runMigration();
