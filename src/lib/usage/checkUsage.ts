// src/lib/usage/checkUsage.ts
import { prisma } from "@/infrastructure/db/client";
import { PlanType, PLAN_CONFIGS, migrateLegacyPlan } from "@/types/Plan";

export type UsageCheckResult = {
  allowed: boolean;
  reason?: "FREE_LIMIT_REACHED" | "STARTER_LIMIT_REACHED" | "PREMIUM_LIMIT_REACHED" | "DB_ERROR";
  currentUsage: number;
  maxAllowed: number;
  resetsAt?: string;
};

export async function checkUsage(userId: string): Promise<UsageCheckResult> {
  try {
    // Get user's plan
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true }
    });

    const rawPlan = user?.plan || "FREE";
    const planType = migrateLegacyPlan(rawPlan) as PlanType;
    const config = PLAN_CONFIGS[planType];

    // Check TOTAL limit (for FREE plan)
    if (config.maxAnalysesTotal !== -1) {
      const totalUsage = await prisma.voiceSession.count({
        where: { userId }
      });

      if (totalUsage >= config.maxAnalysesTotal) {
        return {
          allowed: false,
          reason: "FREE_LIMIT_REACHED",
          currentUsage: totalUsage,
          maxAllowed: config.maxAnalysesTotal
        };
      }

      return {
        allowed: true,
        currentUsage: totalUsage,
        maxAllowed: config.maxAnalysesTotal
      };
    }

    // Check MONTHLY limit (for STARTER and PREMIUM)
    if (config.maxAnalysesPerMonth !== -1) {
      const monthStart = getMonthStart(new Date());
      
      const monthlyUsage = await prisma.voiceSession.count({
        where: {
          userId,
          createdAt: { gte: monthStart }
        }
      });

      if (monthlyUsage >= config.maxAnalysesPerMonth) {
        return {
          allowed: false,
          reason: planType === "STARTER" ? "STARTER_LIMIT_REACHED" : "PREMIUM_LIMIT_REACHED",
          currentUsage: monthlyUsage,
          maxAllowed: config.maxAnalysesPerMonth,
          resetsAt: getNextMonthStart(new Date()).toISOString()
        };
      }

      return {
        allowed: true,
        currentUsage: monthlyUsage,
        maxAllowed: config.maxAnalysesPerMonth
      };
    }

    // Default: allow (shouldn't reach here with current config)
    return {
      allowed: true,
      currentUsage: 0,
      maxAllowed: -1
    };

  } catch (error) {
    console.error("[CHECK_USAGE] Error:", error);
    // Fail-open: allow usage if DB error
    return {
      allowed: true,
      currentUsage: 0,
      maxAllowed: -1,
      reason: "DB_ERROR"
    };
  }
}

// Helper functions
function getMonthStart(date: Date): Date {
  const d = new Date(date);
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function getNextMonthStart(date: Date): Date {
  const d = new Date(date);
  d.setUTCMonth(d.getUTCMonth() + 1);
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}
