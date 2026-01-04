// Create waitlist table
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrate() {
  console.log('Creating waitlist table...');
  
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        position INTEGER NOT NULL,
        referred_by TEXT,
        referral_count INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        notified_at TIMESTAMP WITH TIME ZONE,
        has_access BOOLEAN DEFAULT FALSE
      )
    `);
    console.log('✓ Created waitlist table');

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email)
    `);
    console.log('✓ Created email index');

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_waitlist_position ON waitlist(position)
    `);
    console.log('✓ Created position index');

    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
