import { Plan, PLAN_CONFIGS } from "@/types/Plan";

/**
 * Starter Plan Definition - v3.0 (Simplified)
 *
 * REGLA: 100 análisis/mes (resetea cada 1° del mes)
 * 
 * Beneficios:
 * - Solo análisis de voz (no video)
 * - 21 días de protocolo
 * - Cursos de oratoria
 * - Tracking de progreso
 */
export const STARTER_PLAN: Plan = {
  type: "STARTER",
  features: PLAN_CONFIGS.STARTER
};
