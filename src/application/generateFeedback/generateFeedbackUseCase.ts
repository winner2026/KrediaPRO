import { AuthorityScore } from "@/domain/authority/AuthorityScore";
import { generateAuthorityFeedback } from "@/infrastructure/openai/feedback";
import { parseAuthorityFeedback } from "./parseAuthorityFeedback";
import { AuthorityFeedback } from "@/types/feedback";
import { fallbackFeedback } from "./fallbackFeedback";

export async function generateFeedbackUseCase(
  score: AuthorityScore
): Promise<AuthorityFeedback> {
  try {
    const rawText = await generateAuthorityFeedback({
      authorityLevel: score.level,
      strengths: score.strengths,
      weaknesses: score.weaknesses,
      priorityAdjustment: score.priorityAdjustment,
    });

    return parseAuthorityFeedback(rawText);
  } catch (error) {
    console.error("GPT feedback failed", error);
    return fallbackFeedback;
  }
}
