import { AuthorityScore } from "./AuthorityScore";
import { VoiceMetrics, calculateAuthorityLevel } from "./calculateAuthorityLevel";
import { calculateAuthorityDetails } from "./calculateAuthorityDetails";

export function buildAuthorityScore(
  metrics: VoiceMetrics
): AuthorityScore {
  const level = calculateAuthorityLevel(metrics);
  const { strengths, weaknesses, priorityAdjustment } =
    calculateAuthorityDetails(metrics);

  return {
    level,
    strengths,
    weaknesses,
    priorityAdjustment,
  };
}
