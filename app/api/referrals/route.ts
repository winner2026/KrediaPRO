import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/db/client';

export const runtime = 'nodejs';

/**
 * GET /api/referrals
 * 
 * Obtiene datos de referidos para un código.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: 'Código requerido' },
        { status: 400 }
      );
    }

    // Buscar referidos en la tabla de referrals
    const result = await prisma.$queryRaw<{ referral_count: number }[]>`
      SELECT COALESCE(COUNT(*), 0)::int as referral_count 
      FROM referrals 
      WHERE referrer_code = ${code}
    `;

    return NextResponse.json({
      success: true,
      referralCount: result[0]?.referral_count || 0,
    });

  } catch (error) {
    console.error('[REFERRALS] Error:', error);
    // Si la tabla no existe, devolver 0
    return NextResponse.json({
      success: true,
      referralCount: 0,
    });
  }
}

/**
 * POST /api/referrals
 * 
 * Registra un nuevo referido.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { referrerCode, referredUserId } = body;

    if (!referrerCode || !referredUserId) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }

    // Verificar que no se auto-refiera
    if (referrerCode === referredUserId) {
      return NextResponse.json(
        { error: 'No puedes referirte a ti mismo' },
        { status: 400 }
      );
    }

    // Verificar que no exista ya este referido
    const existing = await prisma.$queryRaw<{ id: number }[]>`
      SELECT id FROM referrals 
      WHERE referred_user_id = ${referredUserId}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Este usuario ya fue referido' },
        { status: 409 }
      );
    }

    // Registrar referido
    await prisma.$executeRawUnsafe(`
      INSERT INTO referrals (referrer_code, referred_user_id, created_at)
      VALUES ($1, $2, NOW())
    `, referrerCode, referredUserId);

    console.log('[REFERRALS] New referral:', { referrerCode, referredUserId });

    return NextResponse.json({
      success: true,
      message: 'Referido registrado',
    });

  } catch (error) {
    console.error('[REFERRALS] Error:', error);
    return NextResponse.json(
      { error: 'Error al registrar referido' },
      { status: 500 }
    );
  }
}
