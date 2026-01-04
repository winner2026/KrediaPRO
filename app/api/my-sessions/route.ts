import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/db/client';
import {
  generateFingerprint,
  getClientIP,
  normalizeUserAgent,
} from '@/lib/fingerprint/generateFingerprint';

export const runtime = 'nodejs';

interface VoiceSessionRow {
  id: string;
  created_at: Date;
  transcription: string;
  authority_level: string;
  authority_score: number;
  words_per_minute: number;
  duration_seconds: number;
  strengths: string[];
  weaknesses: string[];
  feedback_diagnostico: string;
}

/**
 * GET /api/my-sessions
 * 
 * Obtiene el historial de sesiones de voz del usuario actual.
 * Identifica al usuario por fingerprint (mismo método que /api/analysis).
 */
export async function GET(req: NextRequest) {
  try {
    // Obtener userId del query param o generar fingerprint
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    const ip = getClientIP(req.headers, (req as { ip?: string }).ip);
    const userAgent = normalizeUserAgent(req.headers.get('user-agent'));
    const fingerprint = generateFingerprint(userId, ip, userAgent);

    console.log('[MY-SESSIONS] Fetching sessions for:', fingerprint);

    // Usar raw query para evitar problemas con el cliente Prisma auto-generado
    const sessions = await prisma.$queryRaw<VoiceSessionRow[]>`
      SELECT 
        id,
        created_at,
        transcription,
        authority_level,
        authority_score,
        words_per_minute,
        duration_seconds,
        strengths,
        weaknesses,
        feedback_diagnostico
      FROM voice_sessions
      WHERE user_id = ${fingerprint}
      ORDER BY created_at DESC
      LIMIT 50
    `;

    // Calcular estadísticas
    const stats = {
      totalSessions: sessions.length,
      avgScore: sessions.length > 0 
        ? Math.round(sessions.reduce((sum, s) => sum + s.authority_score, 0) / sessions.length)
        : 0,
      highCount: sessions.filter(s => s.authority_level === 'HIGH').length,
      mediumCount: sessions.filter(s => s.authority_level === 'MEDIUM').length,
      lowCount: sessions.filter(s => s.authority_level === 'LOW').length,
      // Evolución: últimas 10 sesiones para el gráfico (en orden cronológico)
      evolution: sessions
        .slice(0, 10)
        .reverse()
        .map(s => ({
          date: s.created_at instanceof Date ? s.created_at.toISOString() : String(s.created_at),
          score: s.authority_score,
          level: s.authority_level,
        })),
    };

    console.log('[MY-SESSIONS] Found', sessions.length, 'sessions');

    return NextResponse.json({
      success: true,
      data: {
        sessions: sessions.map(s => ({
          id: s.id,
          createdAt: s.created_at instanceof Date ? s.created_at.toISOString() : String(s.created_at),
          transcription: s.transcription.substring(0, 100) + (s.transcription.length > 100 ? '...' : ''),
          authorityLevel: s.authority_level,
          authorityScore: s.authority_score,
          wordsPerMinute: s.words_per_minute,
          durationSeconds: Number(s.duration_seconds),
          strengths: s.strengths,
          weaknesses: s.weaknesses,
          diagnosis: s.feedback_diagnostico,
        })),
        stats,
      },
    });
  } catch (error) {
    console.error('[MY-SESSIONS] Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener historial', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
