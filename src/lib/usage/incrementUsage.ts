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
  console.log('[INCREMENT_USAGE] 🔄 STARTING incrementUsage');
  console.log('[INCREMENT_USAGE] Input:', { userId, planType });

  try {
    console.log('[INCREMENT_USAGE] 📝 About to execute INSERT/UPDATE query...');

    const result = await db.query(
      `INSERT INTO usage (user_id, total_analyses, plan_type, created_at, updated_at)
       VALUES ($1, 1, $2, NOW(), NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET
         total_analyses = usage.total_analyses + 1,
         updated_at = NOW()
       RETURNING user_id, total_analyses, plan_type`,
      [userId, planType]
    );

    console.log('[INCREMENT_USAGE] ✅ Query executed successfully!');
    console.log('[INCREMENT_USAGE] Result:', result.rows[0]);
    console.log(`[INCREMENT_USAGE] User ${userId} usage incremented (plan: ${planType})`);
  } catch (error) {
    console.error("[INCREMENT_USAGE] ❌ ERROR occurred!");
    console.error("[INCREMENT_USAGE] Error details:", error);
    console.error("[INCREMENT_USAGE] Error message:", error instanceof Error ? error.message : String(error));
    console.error("[INCREMENT_USAGE] Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    throw error;
  }

  console.log('[INCREMENT_USAGE] 🏁 FINISHED incrementUsage');
}
