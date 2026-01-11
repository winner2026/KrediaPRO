import { Plan, PLAN_CONFIGS } from "@/types/Plan";

/**
 * Free Plan Definition - v3.0 (Simplified)
 *
 * REGLA: 3 análisis TOTALES (lifetime)
 * 
 * Beneficios:
 * - Suficiente para probar el producto
 * - Crear urgencia de upgrade
 * - Costo controlado: ~$0.03/usuario total
 * 
 * STARTER desbloquea:
 * - 100 análisis/mes
 * - 21 días de protocolo
 * - Cursos de oratoria
 */
export const FREE_PLAN: Plan = {
  type: "FREE",
  features: PLAN_CONFIGS.FREE
};
