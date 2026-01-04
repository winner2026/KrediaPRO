import { db } from "@/infrastructure/db/client";
import { PlanType } from "@/types/Plan";

/**
 * Increment usage count for a user
 *
 * Tracks both total and weekly usage.
 * Weekly usage resets when week_start is older than current week.
 */
export async function incrementUsage(
  userId: string,
  planType: PlanType = "FREE"
): Promise<void> {
  console.log('[INCREMENT_USAGE] Starting for user:', userId);

  try {
    const weekStart = getWeekStart(new Date());

    // Upsert with weekly reset logic
    const result = await db.query(
      `INSERT INTO usage (user_id, total_analyses, weekly_analyses, week_start, plan_type, created_at, updated_at)
       VALUES ($1, 1, 1, $2, $3, NOW(), NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET
         total_analyses = usage.total_analyses + 1,
         weekly_analyses = CASE 
           WHEN usage.week_start < $2 THEN 1  -- New week, reset counter
           ELSE usage.weekly_analyses + 1     -- Same week, increment
         END,
         week_start = CASE 
           WHEN usage.week_start < $2 THEN $2  -- Update to current week
           ELSE usage.week_start               -- Keep existing
         END,
         updated_at = NOW()
       RETURNING user_id, total_analyses, weekly_analyses, week_start`,
      [userId, weekStart.toISOString(), planType]
    );

    console.log('[INCREMENT_USAGE] Result:', result.rows[0]);
  } catch (error) {
    console.error("[INCREMENT_USAGE] Error:", error);
    throw error;
  }
}

/**
 * Get the start of the current week (Monday 00:00:00 UTC)
 */
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getUTCDay();
  const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1);
  d.setUTCDate(diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}
