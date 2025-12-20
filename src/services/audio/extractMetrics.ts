export function extractMetrics(audio: Buffer) {
  return {
    wordsPerMinute: 120,
    avgPauseDuration: 0.5,
    pauseCount: 0,
    pitchVariation: 0.2,
    energyStability: 0.6
  };
}
