export const runtime = "nodejs";

import { analyzeVoiceUseCase } from '@/application/analyzeVoice/analyzeVoiceUseCase';
import { generateFeedbackUseCase } from '@/application/generateFeedback/generateFeedbackUseCase';
import { getOrCreateAnonymousUser } from '@/application/users/getOrCreateAnonymousUser';
import { saveVoiceSession } from '@/application/tracking/saveVoiceSession';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File | null;
    const providedUserId = formData.get('userId') as string | null;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      );
    }

    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());

    const result = await analyzeVoiceUseCase({
      audioBuffer,
      userId: providedUserId ?? undefined,
    });

    const userId = await getOrCreateAnonymousUser();
    await saveVoiceSession(userId, result.authorityScore.level);

    const feedback = await generateFeedbackUseCase(result.authorityScore);

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        feedback,
      },
    });
  } catch (error) {
    console.error('[ANALYSIS_UPLOAD_ERROR]', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
