import { VoiceMetrics } from "../voice/VoiceMetrics";

export type AuthorityLevel = "LOW" | "MEDIUM" | "HIGH";
export type PriorityAdjustment =
  | "SLOW_DOWN"
  | "PAUSE_MORE"
  | "INCREASE_ENERGY"
  | "STABILIZE_PITCH";

export interface AuthorityScore {
  level: AuthorityLevel;
  strengths: string[];
  weaknesses: string[];
  priorityAdjustment: PriorityAdjustment;
  score: number;
}

const MAX_AUTHORITY_POINTS = 8;

// Calcula nivel y puntos de autoridad
export function calculateAuthorityLevel(metrics: VoiceMetrics): {
  level: AuthorityLevel;
  points: number;
} {
  let score = 0;

  // Ritmo
  if (metrics.wordsPerMinute >= 110 && metrics.wordsPerMinute <= 150) {
    score += 2;
  } else if (metrics.wordsPerMinute >= 90 && metrics.wordsPerMinute <= 170) {
    score += 1;
  }

  // Pausas
  if (metrics.avgPauseDuration >= 0.4 && metrics.avgPauseDuration <= 0.8) {
    score += 2;
  } else if (metrics.avgPauseDuration >= 0.2) {
    score += 1;
  }

  // Variación de tono
  if (metrics.pitchVariation >= 0.15 && metrics.pitchVariation <= 0.35) {
    score += 2;
  } else if (metrics.pitchVariation >= 0.1) {
    score += 1;
  }

  // Estabilidad de energía
  if (metrics.energyStability >= 0.7) {
    score += 2;
  } else if (metrics.energyStability >= 0.5) {
    score += 1;
  }

  const level: AuthorityLevel =
    score >= 7 ? "HIGH" : score >= 4 ? "MEDIUM" : "LOW";

  return { level, points: score };
}

// Calcula detalles de fortalezas, debilidades y prioridad
export function calculateAuthorityDetails(metrics: VoiceMetrics): {
  strengths: string[];
  weaknesses: string[];
  priorityAdjustment: PriorityAdjustment;
} {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Claridad por ritmo
  if (metrics.wordsPerMinute >= 110 && metrics.wordsPerMinute <= 150) {
    strengths.push("claridad");
  } else {
    weaknesses.push("ritmo");
  }

  // Uso de pausas
  if (metrics.avgPauseDuration >= 0.4) {
    strengths.push("uso de pausas");
  } else {
    weaknesses.push("pausas");
  }

  // Energía
  if (metrics.energyStability >= 0.7) {
    strengths.push("energía estable");
  } else {
    weaknesses.push("energía");
  }

  // Prioridad (una sola, clara)
  let priorityAdjustment: PriorityAdjustment = "SLOW_DOWN";

  if (metrics.wordsPerMinute > 160) {
    priorityAdjustment = "SLOW_DOWN";
  } else if (metrics.avgPauseDuration < 0.3) {
    priorityAdjustment = "PAUSE_MORE";
  } else if (metrics.energyStability < 0.5) {
    priorityAdjustment = "INCREASE_ENERGY";
  } else if (metrics.pitchVariation < 0.12) {
    priorityAdjustment = "STABILIZE_PITCH";
  }

  return {
    strengths,
    weaknesses,
    priorityAdjustment,
  };
}

// Construye el score completo
export function buildAuthorityScore(metrics: VoiceMetrics): AuthorityScore {
  const { level, points } = calculateAuthorityLevel(metrics);
  const score = Math.min(100, Math.round((points / MAX_AUTHORITY_POINTS) * 100));
  const { strengths, weaknesses, priorityAdjustment } =
    calculateAuthorityDetails(metrics);

  return {
    level,
    strengths,
    weaknesses,
    priorityAdjustment,
    score,
  };
}
