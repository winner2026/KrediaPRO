
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

async function run() {
  try {
    await client.connect();
    // Get the user active most recently
    const res = await client.query(`
      SELECT id, email, name, created_at, last_login 
      FROM users 
      ORDER BY last_login DESC 
      LIMIT 5;
    `);
    
    if (res.rows.length === 0) {
        console.log("No users found in the database.");
    } else {
        console.log(`Found ${res.rows.length} users:`);
        console.table(res.rows);
    }
  } catch (e) {
    console.error("Error querying DB:", e);
  } finally {
    await client.end();
  }
}

run();
