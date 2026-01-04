/**
 * Usage tracking types
 */

export type UsageRecord = {
  userId: string;
  totalAnalyses: number;
  weeklyAnalyses: number;
  weekStart: Date;
  planType: "FREE" | "PREMIUM";
  createdAt: Date;
  updatedAt: Date;
};

export type UsageCheckResult = {
  allowed: boolean;
  reason?: "FREE_LIMIT_REACHED" | "WEEKLY_LIMIT_REACHED" | "PREMIUM_LIMIT_REACHED";
  currentUsage?: number;
  weeklyUsage?: number;
  maxAllowed?: number;
  resetsAt?: string; // ISO date when the limit resets
};
