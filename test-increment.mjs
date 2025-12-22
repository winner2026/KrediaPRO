import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testIncrement() {
  try {
    const testUserId = 'test-user-' + Date.now();
    console.log('🧪 Probando incrementUsage con userId:', testUserId);
    console.log('');

    // Simular el código de incrementUsage
    console.log('1️⃣ Insertando primer análisis...');
    await db.query(
      `INSERT INTO usage (user_id, total_analyses, plan_type, created_at, updated_at)
       VALUES ($1, 1, $2, NOW(), NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET
         total_analyses = usage.total_analyses + 1,
         updated_at = NOW()`,
      [testUserId, 'FREE']
    );
    console.log('✓ Primer análisis registrado\n');

    // Verificar
    const check1 = await db.query(
      `SELECT total_analyses FROM usage WHERE user_id = $1`,
      [testUserId]
    );
    console.log('   → total_analyses:', check1.rows[0].total_analyses);
    console.log('');

    // Simular segundo análisis (debe incrementar)
    console.log('2️⃣ Insertando segundo análisis...');
    await db.query(
      `INSERT INTO usage (user_id, total_analyses, plan_type, created_at, updated_at)
       VALUES ($1, 1, $2, NOW(), NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET
         total_analyses = usage.total_analyses + 1,
         updated_at = NOW()`,
      [testUserId, 'FREE']
    );
    console.log('✓ Segundo análisis registrado\n');

    // Verificar
    const check2 = await db.query(
      `SELECT total_analyses FROM usage WHERE user_id = $1`,
      [testUserId]
    );
    console.log('   → total_analyses:', check2.rows[0].total_analyses);
    console.log('');

    if (check2.rows[0].total_analyses === 2) {
      console.log('✅ incrementUsage funciona correctamente');
      console.log('   El problema debe estar en otro lado\n');
    } else {
      console.log('❌ incrementUsage NO funciona');
      console.log('   Valor esperado: 2');
      console.log('   Valor obtenido:', check2.rows[0].total_analyses);
    }

    // Limpiar test
    await db.query(`DELETE FROM usage WHERE user_id = $1`, [testUserId]);
    console.log('🧹 Test limpiado');

    await db.end();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testIncrement();
