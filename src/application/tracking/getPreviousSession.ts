import { db } from "@/infrastructure/db/client";
import { VoiceMetrics } from "@/domain/voice/VoiceMetrics";

export type PreviousSession = {
  id: string;
  metrics: VoiceMetrics;
  authorityScore: number;
  createdAt: Date;
};

/**
 * Obtiene la sesión anterior del usuario para comparación.
 * Responsabilidad: Solo traer datos de la sesión previa.
 */
export async function getPreviousSession(
  userId: string
): Promise<PreviousSession | null> {
  const result = await db.query(
    `SELECT
      id,
      words_per_minute,
      avg_pause_duration,
      pause_count,
      filler_count,
      pitch_variation,
      energy_stability,
      authority_score,
      created_at
    FROM voice_sessions
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 1 OFFSET 1`,
    [userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    id: row.id,
    metrics: {
      wordsPerMinute: row.words_per_minute,
      avgPauseDuration: parseFloat(row.avg_pause_duration),
      pauseCount: row.pause_count,
      fillerCount: row.filler_count,
      pitchVariation: parseFloat(row.pitch_variation),
      energyStability: parseFloat(row.energy_stability),
      // Valores por defecto para nuevas métricas (no existen en sesiones antiguas)
      repetitionCount: 0,
      strategicPauses: 0,
      awkwardSilences: 0,
      paceVariability: 0,
      avgSentenceLength: 0,
      longSentences: 0,
      rhythmConsistency: 1,
    },
    authorityScore: row.authority_score,
    createdAt: new Date(row.created_at),
  };
}
