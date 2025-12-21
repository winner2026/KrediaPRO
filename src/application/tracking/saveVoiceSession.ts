import { db } from "@/infrastructure/db/client";
import { VoiceAnalysisResult } from "@/domain/voice/VoiceAnalysisResult";

/**
 * Guarda el resultado completo del análisis de voz en Neon.
 *
 * Responsabilidad: SOLO guardar datos, no calcular ni procesar.
 * El análisis ya viene completo desde analyzeVoiceUseCase.
 */
export async function saveVoiceAnalysis(
  userId: string,
  analysis: VoiceAnalysisResult
): Promise<string> {
  const result = await db.query(
    `INSERT INTO voice_sessions (
      user_id,
      transcription,
      transcription_with_silences,
      words_per_minute,
      avg_pause_duration,
      pause_count,
      filler_count,
      pitch_variation,
      energy_stability,
      duration_seconds,
      authority_level,
      authority_score,
      strengths,
      weaknesses,
      priority_adjustment,
      feedback_diagnostico,
      feedback_lo_que_suma,
      feedback_lo_que_resta,
      feedback_decision,
      feedback_payoff,
      created_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, NOW()
    )
    RETURNING id`,
    [
      userId,
      analysis.transcription,
      analysis.transcriptionWithSilences,
      analysis.metrics.wordsPerMinute,
      analysis.metrics.avgPauseDuration,
      analysis.metrics.pauseCount,
      analysis.metrics.fillerCount,
      analysis.metrics.pitchVariation,
      analysis.metrics.energyStability,
      analysis.durationSeconds,
      analysis.authorityScore.level,
      analysis.authorityScore.score,
      JSON.stringify(analysis.authorityScore.strengths),
      JSON.stringify(analysis.authorityScore.weaknesses),
      analysis.authorityScore.priorityAdjustment,
      analysis.feedback.diagnostico,
      JSON.stringify(analysis.feedback.lo_que_suma),
      JSON.stringify(analysis.feedback.lo_que_resta),
      analysis.feedback.decision,
      analysis.feedback.payoff,
    ]
  );

  return result.rows[0].id;
}
