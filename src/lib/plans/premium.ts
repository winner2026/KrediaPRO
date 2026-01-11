import { Plan, PLAN_CONFIGS } from "@/types/Plan";

/**
 * Premium Plan Definition - v3.0 (Simplified)
 *
 * REGLA: 250 análisis/mes (resetea cada 1° del mes)
 * 
 * Beneficios:
 * - Análisis de voz + video
 * - 30 días de protocolo completo
 * - Métricas espectrales (Elite)
 * - Métricas de postura ejecutiva
 * - Cursos completos
 */
export const PREMIUM_PLAN: Plan = {
  type: "PREMIUM",
  features: PLAN_CONFIGS.PREMIUM
};
