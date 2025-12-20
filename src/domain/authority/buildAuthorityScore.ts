import { AuthorityScore } from "./AuthorityScore";
import {
  VoiceMetrics,
  calculateAuthorityLevel,
} from "./calculateAuthorityLevel";
import { calculateAuthorityDetails } from "./calculateAuthorityDetails";

const MAX_AUTHORITY_POINTS = 8;

export function buildAuthorityScore(
  metrics: VoiceMetrics
): AuthorityScore {
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

export function buildDiagnosis(score: number): string {
  if (score >= 80) return "Tu voz transmite alta autoridad y seguridad.";
  if (score >= 60)
    return "Tu voz transmite autoridad media, pero genera dudas en contextos de liderazgo.";
  return "Tu voz transmite baja autoridad y reduce el impacto de tus ideas.";
}

export function buildStrengths(metrics: VoiceMetrics): string[] {
  const strengths: string[] = [];
  const pace = Math.min(1, metrics.wordsPerMinute / 200);
  const clarity = Math.min(1, metrics.pitchVariation / 0.35);

  if (pace >= 0.6 && pace <= 0.8) {
    strengths.push("Tu ritmo es estable y no suenas apurado.");
  }

  if (clarity >= 0.7) {
    strengths.push("La claridad de tu articulación facilita que te entiendan.");
  }

  return strengths.slice(0, 2);
}

export function buildWeaknesses(metrics: VoiceMetrics): string[] {
  const weaknesses: string[] = [];
  const pauses = metrics.avgPauseDuration;
  const energy = metrics.energyStability;

  if (pauses > 0.7) {
    weaknesses.push(
      "Haces pausas demasiado largas antes de cerrar ideas, lo que debilita el mensaje."
    );
  }

  if (energy < 0.5) {
    weaknesses.push("La variación de energía es baja, suenas plano.");
  }

  return weaknesses.slice(0, 2);
}

export function buildDecision(weaknesses: string[]): string {
  if (weaknesses.length === 0) {
    return "Mantén este patrón vocal y enfócate en cerrar frases con intención.";
  }

  return "En tu próxima intervención, reduce las pausas antes de cerrar frases y marca el final con un tono descendente.";
}
