import { db } from "@/infrastructure/db/client";
import { PlanType } from "@/types/Plan";

/**
 * Increment usage count for a user
 *
 * Creates a usage record if it doesn't exist,
 * or increments total_analyses if it does.
 */
export async function incrementUsage(
  userId: string,
  planType: PlanType = "FREE"
): Promise<void> {
  try {
    await db.query(
      `INSERT INTO usage (user_id, total_analyses, plan_type, created_at, updated_at)
       VALUES ($1, 1, $2, NOW(), NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET
         total_analyses = usage.total_analyses + 1,
         updated_at = NOW()`,
      [userId, planType]
    );

    console.log(`[INCREMENT_USAGE] User ${userId} usage incremented (plan: ${planType})`);
  } catch (error) {
    console.error("[INCREMENT_USAGE] Error:", error);
    throw error;
  }
}
