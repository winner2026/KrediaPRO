export type VoiceMetrics = {
  wordsPerMinute: number;
  avgPauseDuration: number;
  pauseCount: number;
  fillerCount: number;
  pitchVariation: number;
  energyStability: number;
};

type TranscriptionSegment = {
  id: number;
  start: number;
  end: number;
  text: string;
};

export function extractMetrics(
  transcription: string,
  segments: TranscriptionSegment[],
  durationSeconds: number
): VoiceMetrics {
  // Contar palabras (excluyendo muletillas)
  const words = transcription.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Palabras por minuto
  const wordsPerMinute = (wordCount / durationSeconds) * 60;

  // Contar muletillas comunes en español
  const fillerWords = ['eh', 'ehh', 'ehhh', 'um', 'umm', 'ah', 'ahh', 'este', 'pues', 'o sea'];
  const fillerCount = words.filter(word =>
    fillerWords.includes(word.toLowerCase().replace(/[.,!?]/g, ''))
  ).length;

  // Calcular pausas entre segmentos
  const pauses: number[] = [];
  for (let i = 0; i < segments.length - 1; i++) {
    const gap = segments[i + 1].start - segments[i].end;
    if (gap > 0.1) { // Solo pausas mayores a 100ms
      pauses.push(gap);
    }
  }

  const pauseCount = pauses.length;
  const avgPauseDuration = pauseCount > 0
    ? pauses.reduce((a, b) => a + b, 0) / pauseCount
    : 0;

  // Variación de tono estimada (basada en variación de duración de segmentos)
  const segmentDurations = segments.map(s => s.end - s.start);
  const avgDuration = segmentDurations.reduce((a, b) => a + b, 0) / segmentDurations.length;
  const variance = segmentDurations.reduce((sum, d) => sum + Math.pow(d - avgDuration, 2), 0) / segmentDurations.length;
  const pitchVariation = Math.sqrt(variance) / avgDuration;

  // Estabilidad de energía (estimada por consistencia en longitud de texto por segmento)
  const wordsPerSegment = segments.map(s => s.text.split(/\s+/).length);
  const avgWordsPerSegment = wordsPerSegment.reduce((a, b) => a + b, 0) / wordsPerSegment.length;
  const energyVariance = wordsPerSegment.reduce(
    (sum, w) => sum + Math.pow(w - avgWordsPerSegment, 2),
    0
  ) / wordsPerSegment.length;
  const energyStability = 1 / (1 + Math.sqrt(energyVariance));

  return {
    wordsPerMinute: Math.round(wordsPerMinute),
    avgPauseDuration: Number(avgPauseDuration.toFixed(2)),
    pauseCount,
    fillerCount,
    pitchVariation: Number(pitchVariation.toFixed(2)),
    energyStability: Number(energyStability.toFixed(2)),
  };
}
