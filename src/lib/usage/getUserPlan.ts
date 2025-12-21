import { db } from "@/infrastructure/db/client";
import { PlanType } from "@/types/Plan";

/**
 * Get the plan type for a user
 *
 * Checks the database to determine if user is FREE or PREMIUM.
 * Defaults to FREE for new users.
 */
export async function getUserPlan(userId: string): Promise<PlanType> {
  try {
    const result = await db.query(
      `SELECT plan_type FROM usage WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      // New user = FREE
      return "FREE";
    }

    return result.rows[0].plan_type as PlanType;
  } catch (error) {
    console.error("[GET_USER_PLAN] Error:", error);
    // Default to FREE on error
    return "FREE";
  }
}
