import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Adapter to mimic 'pg' client for legacy code compatibility
export interface LegacyDBClient {
  query(text: string, params?: any[]): Promise<{ rows: any[] }>;
}

export const db: LegacyDBClient = {
  query: async (text: string, params: any[] = []) => {
    // Determine if it's a SELECT query to use queryRaw, otherwise executeRaw
    // However, the existing code expects 'rows' property in return which implies SELECT
    // $queryRawUnsafe returns the array of results directly.
    const result = await prisma.$queryRawUnsafe(text, ...params);
    return { rows: Array.isArray(result) ? result : [result] };
  }
}
