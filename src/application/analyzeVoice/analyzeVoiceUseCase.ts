import { VoiceMetrics } from '../../domain/voice/VoiceMetrics';
import { analyzeAudio } from '../../services/audio/analyzeAudio';
import { extractMetrics } from '../../services/audio/extractMetrics';
import { transcribeAudio } from '../../infrastructure/openai/transcription';
import { AuthorityScore } from '../../domain/authority/AuthorityScore';
import {
  buildAuthorityScore,
  buildDiagnosis,
  buildStrengths,
  buildWeaknesses,
  buildDecision,
} from '../../domain/authority/buildAuthorityScore';

export type AnalyzeVoiceInput = {
  audioBuffer: Buffer;
  userId?: string;
};

export type VoiceDiagnosis = {
  diagnosis: string;
  strengths: string[];
  weaknesses: string[];
  decision: string;
  payoff: string;
};

export type AnalyzeVoiceResult = VoiceDiagnosis & {
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
  const strengths = buildStrengths(metrics);
  const weaknesses = buildWeaknesses(metrics);
  const diagnosis = buildDiagnosis(authorityScore.score);
  const decision = buildDecision(weaknesses);
  const payoff =
    "Si corriges esto, tu voz se va a percibir más firme en reuniones y presentaciones.";

  return {
    transcription,
    metrics,
    durationBytes: duration,
    authorityScore,
    diagnosis,
    strengths,
    weaknesses,
    decision,
    payoff,
  };
}
