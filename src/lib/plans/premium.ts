import { Plan } from "@/types/Plan";

/**
 * Premium Plan Definition
 *
 * - Unlimited analyses
 * - Full history access
 * - Re-record capability
 * - Access to exercises
 */
export const PREMIUM_PLAN: Plan = {
  type: "PREMIUM",
  features: {
    maxAnalyses: null, // null = unlimited
    hasHistory: true,
    hasReRecord: true,
    hasExercises: true,
  },
};
