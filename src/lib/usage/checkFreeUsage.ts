import { UsageCheckResult } from "@/types/Usage";
import { FREE_PLAN } from "@/lib/plans/free";
import { db } from "@/infrastructure/db/client";

/**
 * Check if a Free user can perform another analysis THIS WEEK
 *
 * Free plan allows 3 analyses PER WEEK (resets every Monday).
 * After that, user must wait until next week or upgrade to Premium.
 */
export async function checkFreeUsage(
  userId: string
): Promise<UsageCheckResult> {
  try {
    // Get usage for current week (Monday to Sunday)
    const result = await db.query(
      `SELECT 
        total_analyses,
        weekly_analyses,
        week_start
      FROM usage 
      WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      // New user, no usage yet
      return {
        allowed: true,
        currentUsage: 0,
        weeklyUsage: 0,
        maxAllowed: FREE_PLAN.features.maxAnalysesPerWeek!,
      };
    }

    const row = result.rows[0];
    const weekStart = row.week_start ? new Date(row.week_start) : null;
    const currentWeekStart = getWeekStart(new Date());

    // Check if we're in a new week
    let weeklyUsage = row.weekly_analyses || 0;
    
    if (weekStart && weekStart < currentWeekStart) {
      // New week! Reset weekly counter
      weeklyUsage = 0;
    }

    const maxAllowed = FREE_PLAN.features.maxAnalysesPerWeek!;

    if (weeklyUsage >= maxAllowed) {
      const nextMonday = getNextMonday();
      return {
        allowed: false,
        reason: "WEEKLY_LIMIT_REACHED",
        currentUsage: row.total_analyses || 0,
        weeklyUsage,
        maxAllowed,
        resetsAt: nextMonday.toISOString(),
      };
    }

    return {
      allowed: true,
      currentUsage: row.total_analyses || 0,
      weeklyUsage,
      maxAllowed,
    };
  } catch (error) {
    console.error("[CHECK_FREE_USAGE] Error:", error);
    // In case of DB error, allow the request (fail open)
    return {
      allowed: true,
      currentUsage: 0,
      weeklyUsage: 0,
      maxAllowed: FREE_PLAN.features.maxAnalysesPerWeek!,
    };
  }
}

/**
 * Get the start of the current week (Monday 00:00:00 UTC)
 */
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getUTCDay();
  const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setUTCDate(diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the next Monday (when the limit resets)
 */
function getNextMonday(): Date {
  const now = new Date();
  const day = now.getUTCDay();
  const daysUntilMonday = day === 0 ? 1 : 8 - day;
  const nextMonday = new Date(now);
  nextMonday.setUTCDate(now.getUTCDate() + daysUntilMonday);
  nextMonday.setUTCHours(0, 0, 0, 0);
  return nextMonday;
}
