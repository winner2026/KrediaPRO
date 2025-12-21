import { UsageCheckResult } from "@/types/Usage";

/**
 * Check if a Premium user can perform another analysis
 *
 * Premium has unlimited analyses, so this always returns true.
 * Kept as a separate function for consistency and future expansion
 * (e.g., fair use limits, rate limiting, etc.)
 */
export async function checkPremiumUsage(
  userId: string
): Promise<UsageCheckResult> {
  // Premium = unlimited
  return {
    allowed: true,
    currentUsage: undefined,
    maxAllowed: undefined,
  };
}
