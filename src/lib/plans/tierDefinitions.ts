import { Plan } from "@/types/Plan";

export const VOICE_WEEKLY_PLAN: Plan = {
  type: "VOICE_WEEKLY",
  features: {
    maxAnalyses: -1,
    maxAnalysesPerWeek: 50,
    maxAnalysesPerMonth: -1,
    hasHistory: true,
    hasHistoryLimit: -1,
    hasReRecord: true,
    hasExercises: true,
    hasExercisesLimit: -1,
    hasFullGym: true,
    hasCourses: false,
  }
};

export const VOICE_MONTHLY_PLAN: Plan = {
  type: "VOICE_MONTHLY",
  features: {
    maxAnalyses: -1,
    maxAnalysesPerWeek: -1,
    maxAnalysesPerMonth: 100,
    hasHistory: true,
    hasHistoryLimit: -1,
    hasReRecord: true,
    hasExercises: true,
    hasExercisesLimit: -1,
    hasFullGym: true,
    hasCourses: false,
  }
};

export const STARTER_VIDEO_PLAN: Plan = {
  type: "STARTER",
  features: {
    maxAnalyses: -1,
    maxAnalysesPerWeek: 70,
    maxAnalysesPerMonth: -1,
    hasHistory: true,
    hasHistoryLimit: -1,
    hasReRecord: true,
    hasExercises: true,
    hasExercisesLimit: -1,
    hasFullGym: true,
    hasCourses: true,
  }
};
