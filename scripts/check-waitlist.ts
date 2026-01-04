// Check waitlist entries
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  try {
    const results = await prisma.$queryRaw`SELECT * FROM waitlist`;
    console.log('Waitlist entries:');
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
