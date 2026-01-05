/**
 * Plan types for Free and Premium tiers
 */

export type PlanType = "FREE" | "STARTER" | "PREMIUM" | "COACHING";

export type PlanFeatures = {
  maxAnalyses: number; // -1 = unlimited (Premium)
  maxAnalysesPerWeek: number; // -1 = unlimited
  hasHistory: boolean;
  hasHistoryLimit: number; // -1 = unlimited
  hasReRecord: boolean;
  hasExercises: boolean;
  hasExercisesLimit: number; // -1 = unlimited
  hasFullGym: boolean;
  hasCourses: boolean;
};

export type Plan = {
  type: PlanType;
  features: PlanFeatures;
};
