import { VoiceMetrics } from "./calculateAuthorityLevel"
import { PriorityAdjustment } from "./AuthorityScore"

export function calculateAuthorityDetails(metrics: VoiceMetrics): {
  strengths: string[]
  weaknesses: string[]
  priorityAdjustment: PriorityAdjustment
} {
  const strengths: string[] = []
  const weaknesses: string[] = []

  // Claridad por ritmo
  if (metrics.wordsPerMinute >= 110 && metrics.wordsPerMinute <= 150) {
    strengths.push("claridad")
  } else {
    weaknesses.push("ritmo")
  }

  // Uso de pausas
  if (metrics.avgPauseDuration >= 0.4) {
    strengths.push("uso de pausas")
  } else {
    weaknesses.push("pausas")
  }

  // Energía
  if (metrics.energyStability >= 0.7) {
    strengths.push("energía estable")
  } else {
    weaknesses.push("energía")
  }

  // Prioridad (una sola, clara)
  let priorityAdjustment: PriorityAdjustment = "SLOW_DOWN"

  if (metrics.wordsPerMinute > 160) {
    priorityAdjustment = "SLOW_DOWN"
  } else if (metrics.avgPauseDuration < 0.3) {
    priorityAdjustment = "PAUSE_MORE"
  } else if (metrics.energyStability < 0.5) {
    priorityAdjustment = "INCREASE_ENERGY"
  } else if (metrics.pitchVariation < 0.12) {
    priorityAdjustment = "STABILIZE_PITCH"
  }

  return {
    strengths,
    weaknesses,
    priorityAdjustment,
  }
}
