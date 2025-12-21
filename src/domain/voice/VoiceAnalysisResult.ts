import { AuthorityScore } from "../authority/AuthorityScore";
import { VoiceMetrics } from "./VoiceMetrics";

export interface VoiceAnalysisResult {
  transcription: string;
  transcriptionWithSilences: string;
  metrics: VoiceMetrics;
  durationSeconds: number;
  authorityScore: AuthorityScore;
  feedback: {
    diagnostico: string;
    lo_que_suma: string[];
    lo_que_resta: string[];
    decision: string;
    payoff: string;
  };
  createdAt?: string;
  sessionId?: string;
}
