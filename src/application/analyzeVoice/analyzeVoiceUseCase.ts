import { VoiceMetrics } from '../../domain/voice/VoiceMetrics';
import { analyzeAudio } from '../../services/audio/analyzeAudio';
import { extractMetrics } from '../../services/audio/extractMetrics';
import { transcribeAudio } from '../../infrastructure/openai/transcription';
import { AuthorityScore } from '../../domain/authority/AuthorityScore';
import { buildAuthorityScore } from '../../domain/authority/buildAuthorityScore';

export type AnalyzeVoiceInput = {
  audioBuffer: Buffer;
  userId?: string;
};

export type AnalyzeVoiceResult = {
  transcription: string;
  metrics: VoiceMetrics;
  durationBytes: number;
  authorityScore: AuthorityScore;
};

export async function analyzeVoiceUseCase({
  audioBuffer,
}: AnalyzeVoiceInput): Promise<AnalyzeVoiceResult> {
  const transcription = await transcribeAudio(audioBuffer);
  const metrics = extractMetrics(audioBuffer);
  const { duration } = analyzeAudio(audioBuffer);
  const authorityScore = buildAuthorityScore(metrics);

  return {
    transcription,
    metrics,
    durationBytes: duration,
    authorityScore,
  };
}
