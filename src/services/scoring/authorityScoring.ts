export function authorityScoring(metrics: { rhythm: number }) {
  return metrics.rhythm * 20;
}
