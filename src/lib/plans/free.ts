import { Plan } from "@/types/Plan";

/**
 * Free Plan Definition - MVP
 *
 * REGLA DURA:
 * - 1 análisis TOTAL por usuario (no por día, no por semana, TOTAL)
 * - No historial
 * - No re-grabar
 * - No ejercicios
 * - No comparaciones
 *
 * Objetivo:
 * - Evitar abusos
 * - Reducir costos
 * - Aumentar deseo de Premium
 */
export const FREE_PLAN: Plan = {
  type: "FREE",
  features: {
    maxAnalyses: 1, // TOTAL, no por período
    hasHistory: false,
    hasReRecord: false,
    hasExercises: false,
  },
};
