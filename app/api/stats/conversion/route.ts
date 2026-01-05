export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/db/client";

export async function GET(req: NextRequest) {
  try {
    // 1. Total de usuarios únicos (Fingerprints en Usage)
    const totalUsers = await prisma.usage.count();

    // 2. Usuarios que han realizado al menos un análisis
    const activeUsers = await prisma.usage.count({
      where: {
        totalAnalyses: { gt: 0 }
      }
    });

    // 3. Usuarios Premium (suponiendo que actualizamos plan_type)
    const premiumUsers = await prisma.usage.count({
      where: {
        planType: { not: "FREE" }
      }
    });

    // 4. Errores técnicos (Novedad para Health Check)
    const technicalErrors = await prisma.$queryRaw`
      SELECT count(*)::int as count FROM events 
      WHERE event IN ('camera_error', 'mic_error')
    ` as { count: number }[];

    // 5. Calcular % de Conversión
    const conversionRate = totalUsers > 0 ? (premiumUsers / totalUsers) * 100 : 0;
    const activationRate = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;

    return NextResponse.json({
      totalUsers,
      activeUsers,
      premiumUsers,
      technicalErrors: technicalErrors[0]?.count || 0,
      conversionRate: `${conversionRate.toFixed(2)}%`,
      activationRate: `${activationRate.toFixed(2)}%`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("[STATS API] Error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
