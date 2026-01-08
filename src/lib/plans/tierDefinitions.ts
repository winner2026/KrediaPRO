import { Plan } from "@/types/Plan";

export const VOICE_WEEKLY_PLAN: Plan = {
  type: "VOICE_WEEKLY",
  features: {
    maxAnalysesPerWeek: 55, // 55 análisis semanales (Costo est. < $0.70)
    maxAnalysesPerMonth: -1,
    maxAnalyses: -1,
    hasHistory: true,
    hasHistoryLimit: -1,
    hasReRecord: true,
    hasExercises: true,
  name: "VOICE_WEEKLY",
  features: {
    maxAnalysesPerWeek: 50,
    canAccessHistory: true,
    canUseGym: true,
    canUseVideo: false,
    prioritySupport: false
  }
};

export const VOICE_MONTHLY_PLAN: Plan = {
  name: "VOICE_MONTHLY",
  features: {
    maxAnalysesPerMonth: 100,
    canAccessHistory: true,
    canUseGym: true,
    canUseVideo: false,
    prioritySupport: true
  }
};

export const STARTER_VIDEO_PLAN: Plan = {
  },
};
