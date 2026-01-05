import { Plan } from "../../types/Plan";

export const STARTER_PLAN: Plan = {
  type: "STARTER",
  features: {
    maxAnalyses: 10,
    maxAnalysesPerWeek: 3,
    hasHistory: true,
    hasHistoryLimit: 10,
    hasReRecord: true,
    hasExercises: true,
    hasExercisesLimit: 5,
    hasFullGym: false,
    hasCourses: true, // Access to specific courses like the 7-day sprint
  },
};
