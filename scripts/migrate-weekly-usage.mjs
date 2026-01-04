// Run weekly usage migration
import { prisma } from '../src/infrastructure/db/client.js';

async function migrate() {
  console.log('Running weekly usage migration...');
  
  try {
    // Add weekly_analyses column
    await prisma.$executeRawUnsafe(`
      ALTER TABLE usage 
      ADD COLUMN IF NOT EXISTS weekly_analyses INTEGER DEFAULT 0
    `);
    console.log('✓ Added weekly_analyses column');

    // Add week_start column
    await prisma.$executeRawUnsafe(`
      ALTER TABLE usage 
      ADD COLUMN IF NOT EXISTS week_start TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    `);
    console.log('✓ Added week_start column');

    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
