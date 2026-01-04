// Create/update usage table for weekly tracking
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrate() {
  console.log('Running usage table migration...');
  
  try {
    // Create usage table if not exists
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS usage (
        user_id TEXT PRIMARY KEY,
        total_analyses INTEGER DEFAULT 0,
        weekly_analyses INTEGER DEFAULT 0,
        week_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        plan_type TEXT DEFAULT 'FREE',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log('✓ Created/verified usage table');

    // Create index
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_usage_week_start ON usage(week_start)
    `);
    console.log('✓ Created index');

    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
