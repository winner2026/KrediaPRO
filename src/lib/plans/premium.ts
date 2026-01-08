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
    maxAnalyses: -1,
    maxAnalysesPerWeek: -1,
    maxAnalysesPerMonth: 250, // Aumentado para percepción "Ilimitada" (Costo < $5 en plan de $29)
    hasHistory: true,
    hasHistoryLimit: -1,
    hasReRecord: true,
    hasExercises: true,
    hasExercisesLimit: -1,
    hasFullGym: true,
    hasCourses: true,
  },
};
