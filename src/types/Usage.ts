/**
 * Usage tracking types
 */

export type UsageRecord = {
  userId: string;
  totalAnalyses: number;
  planType: "FREE" | "PREMIUM";
  createdAt: Date;
  updatedAt: Date;
};

export type UsageCheckResult = {
  allowed: boolean;
  reason?: "FREE_LIMIT_REACHED" | "PREMIUM_LIMIT_REACHED";
  currentUsage?: number;
  maxAllowed?: number;
};
