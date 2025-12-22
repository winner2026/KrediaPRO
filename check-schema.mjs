import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkSchema() {
  try {
    console.log('📋 Verificando esquema de la base de datos...\n');

    // Verificar si la tabla usage existe
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'usage'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('❌ La tabla "usage" NO EXISTE');
      console.log('   → Las migraciones no se han ejecutado en producción\n');
      process.exit(1);
    }

    console.log('✓ La tabla "usage" existe\n');

    // Obtener estructura de la tabla
    const structure = await db.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'usage'
      ORDER BY ordinal_position;
    `);

    console.log('Estructura de la tabla usage:');
    structure.rows.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type}${col.is_nullable === 'NO' ? ' NOT NULL' : ''}`);
    });

    // Verificar índices
    const indexes = await db.query(`
      SELECT indexname, indexdef
      FROM pg_indexes
      WHERE tablename = 'usage';
    `);

    console.log('\nÍndices:');
    indexes.rows.forEach(idx => {
      console.log(`  - ${idx.indexname}`);
    });

    // Contar registros
    const count = await db.query(`SELECT COUNT(*) FROM usage`);
    console.log(`\nTotal de registros: ${count.rows[0].count}`);

    await db.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkSchema();
