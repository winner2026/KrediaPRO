import { VoiceMetrics, extractMetrics } from '../../domain/voice/VoiceMetrics';
import { transcribeAudio, TranscriptionSegment } from '../../infrastructure/openai/transcription';
import { generateDynamicFeedback, DynamicFeedbackOutput } from '../../infrastructure/openai/feedback';
import { AuthorityScore, buildAuthorityScore } from '../../domain/authority/AuthorityScore';

export type AnalyzeVoiceInput = {
  audioBuffer: Buffer;
  userId?: string;
};

export type AnalyzeVoiceResult = {
  transcription: string;
  transcriptionWithSilences: string;
  metrics: VoiceMetrics;
  durationSeconds: number;
  authorityScore: AuthorityScore;
  feedback: DynamicFeedbackOutput;
};

function buildTranscriptionWithSilences(
  segments: TranscriptionSegment[]
): string {
  let result = '';

  for (let i = 0; i < segments.length; i++) {
    result += segments[i].text;

    // Si hay un siguiente segmento, verificar la pausa
    if (i < segments.length - 1) {
      const gap = segments[i + 1].start - segments[i].end;
      if (gap > 0.7) {  // Pausas mayores a 700ms se marcan como silencio
        result += ' [silencio] ';
      } else {
        result += ' ';
      }
    }
  }

  return result.trim();
}

import { analyzePitch } from '../../infrastructure/audio/PitchAnalysis';

export async function analyzeVoiceUseCase({
  audioBuffer,
}: AnalyzeVoiceInput): Promise<AnalyzeVoiceResult> {
  // 1. Transcribir con segmentos (incluye muletillas y pausas)
  console.log('[ANALYZE] Transcribing audio...');
  const transcriptionResult = await transcribeAudio(audioBuffer);

  // 2. Extraer métricas de texto
  console.log('[ANALYZE] Extracting text metrics...');
  const textMetrics = extractMetrics(
    transcriptionResult.text,
    transcriptionResult.segments,
    transcriptionResult.duration
  );

  // 3. Analizar Entonación Real (Pitch) 🎵
  console.log('[ANALYZE] Analyzing pitch & intonation...');
  const pitchMetrics = await analyzePitch(audioBuffer, transcriptionResult.segments);
  
  console.log('[ANALYZE] Pitch Metrics:', pitchMetrics);

  // Combinar métricas
  const metrics: VoiceMetrics = {
    ...textMetrics,
    ...pitchMetrics,
    // Sobrescribir pitchVariation fake con una basada en rango si se desea, 
    // pero mantenemos la calculada por ahora como "variación de duración"
  };

  console.log('[ANALYZE] Final Metrics:', metrics);

  // 4. Construir transcripción con silencios visibles
  const transcriptionWithSilences = buildTranscriptionWithSilences(
    transcriptionResult.segments
  );

  // 5. Calcular score de autoridad
  console.log('[ANALYZE] Calculating authority score...');
  const authorityScore = buildAuthorityScore(metrics, transcriptionResult.duration);

  // 6. Generar feedback dinámico con GPT-4o-mini
  console.log('[ANALYZE] Generating dynamic feedback with GPT-4o-mini...');
  const feedback = await generateDynamicFeedback({
    transcript: transcriptionResult.text,
    metrics,
  });

  console.log('[ANALYZE] Analysis complete!');

  return {
    transcription: transcriptionResult.text,
    transcriptionWithSilences,
    metrics,
    durationSeconds: transcriptionResult.duration,
    authorityScore,
    feedback,
  };
}
