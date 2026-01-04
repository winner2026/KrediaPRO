// Create referrals table
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrate() {
  console.log('Creating referrals table...');
  
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS referrals (
        id SERIAL PRIMARY KEY,
        referrer_code TEXT NOT NULL,
        referred_user_id TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        reward_claimed BOOLEAN DEFAULT FALSE
      )
    `);
    console.log('✓ Created referrals table');

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referrer_code)
    `);
    console.log('✓ Created referrer_code index');

    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
