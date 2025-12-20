export interface VoiceMetrics {
  wordsPerMinute: number
  avgPauseDuration: number
  pauseCount: number
  pitchVariation: number
  energyStability: number
}

export function calculateAuthorityLevel(
  metrics: VoiceMetrics
): "LOW" | "MEDIUM" | "HIGH" {
  let score = 0

  // Ritmo
  if (metrics.wordsPerMinute >= 110 && metrics.wordsPerMinute <= 150) {
    score += 2
  } else if (metrics.wordsPerMinute >= 90 && metrics.wordsPerMinute <= 170) {
    score += 1
  }

  // Pausas
  if (metrics.avgPauseDuration >= 0.4 && metrics.avgPauseDuration <= 0.8) {
    score += 2
  } else if (metrics.avgPauseDuration >= 0.2) {
    score += 1
  }

  // Variación de tono
  if (metrics.pitchVariation >= 0.15 && metrics.pitchVariation <= 0.35) {
    score += 2
  } else if (metrics.pitchVariation >= 0.1) {
    score += 1
  }

  // Estabilidad de energía
  if (metrics.energyStability >= 0.7) {
    score += 2
  } else if (metrics.energyStability >= 0.5) {
    score += 1
  }

  if (score >= 7) return "HIGH"
  if (score >= 4) return "MEDIUM"
  return "LOW"
}
