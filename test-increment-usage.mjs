import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testIncrementUsage() {
  try {
    console.log('🧪 Testing incrementUsage function...\n');

    // Test fingerprint
    const testFingerprint = 'fp-test-diagnostic-' + Date.now();

    console.log('1️⃣ Testing INSERT (first usage)...');
    const result1 = await db.query(
      `INSERT INTO usage (user_id, total_analyses, plan_type, created_at, updated_at)
       VALUES ($1, 1, $2, NOW(), NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET
         total_analyses = usage.total_analyses + 1,
         updated_at = NOW()
       RETURNING user_id, total_analyses, plan_type`,
      [testFingerprint, 'FREE']
    );

    console.log('✅ First insert result:', result1.rows[0]);

    console.log('\n2️⃣ Testing UPDATE (second usage)...');
    const result2 = await db.query(
      `INSERT INTO usage (user_id, total_analyses, plan_type, created_at, updated_at)
       VALUES ($1, 1, $2, NOW(), NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET
         total_analyses = usage.total_analyses + 1,
         updated_at = NOW()
       RETURNING user_id, total_analyses, plan_type`,
      [testFingerprint, 'FREE']
    );

    console.log('✅ Second insert result:', result2.rows[0]);

    console.log('\n3️⃣ Verifying record exists...');
    const verify = await db.query(
      `SELECT * FROM usage WHERE user_id = $1`,
      [testFingerprint]
    );

    console.log('✅ Verification result:', verify.rows[0]);

    console.log('\n4️⃣ Checking all records in usage table...');
    const all = await db.query(`SELECT COUNT(*) as total FROM usage`);
    console.log('Total records in usage table:', all.rows[0].total);

    console.log('\n5️⃣ Checking recent records...');
    const recent = await db.query(`
      SELECT user_id, total_analyses, plan_type, created_at
      FROM usage
      ORDER BY created_at DESC
      LIMIT 5
    `);

    console.log('Recent records:');
    recent.rows.forEach((row, idx) => {
      console.log(`${idx + 1}. ${row.user_id}`);
      console.log(`   Analyses: ${row.total_analyses}`);
      console.log(`   Plan: ${row.plan_type}`);
      console.log(`   Created: ${new Date(row.created_at).toLocaleString()}`);
      console.log('');
    });

    console.log('✅ Test completed successfully!');

    await db.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testIncrementUsage();
