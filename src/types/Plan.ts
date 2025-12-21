/**
 * Plan types for Free and Premium tiers
 */

export type PlanType = "FREE" | "PREMIUM";

export type PlanFeatures = {
  maxAnalyses: number | null; // null = unlimited (Premium)
  hasHistory: boolean;
  hasReRecord: boolean;
  hasExercises: boolean;
};

export type Plan = {
  type: PlanType;
  features: PlanFeatures;
};
