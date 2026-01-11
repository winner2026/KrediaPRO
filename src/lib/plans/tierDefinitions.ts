/**
 * Tier Definitions - v3.0 (Simplified to 3 Plans)
 * 
 * Legacy file - All plan definitions now centralized in @/types/Plan
 * This file exports the same configs for backward compatibility
 */

import { PLAN_CONFIGS } from "@/types/Plan";

// Re-export for backward compatibility
export const VOICE_WEEKLY_PLAN = {
  type: "STARTER" as const,
  features: PLAN_CONFIGS.STARTER
};

export const VOICE_MONTHLY_PLAN = {
  type: "STARTER" as const,
  features: PLAN_CONFIGS.STARTER
};

export const STARTER_VIDEO_PLAN = {
  type: "STARTER" as const,
  features: PLAN_CONFIGS.STARTER
};

// Note: These legacy exports map to the new simplified 3-tier system
// VOICE_WEEKLY → STARTER
// VOICE_MONTHLY → STARTER
// STARTER_VIDEO → STARTER
