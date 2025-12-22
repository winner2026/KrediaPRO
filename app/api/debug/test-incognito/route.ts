export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint para probar detección de incógnito desde el cliente
 */
export async function POST(req: NextRequest) {
  try {
    const {
      incognitoResult,
      userAgent,
      hasLocalStorage,
      storageQuota,
      fileSystemAPIAvailable,
      testResults
    } = await req.json();

    const diagnostics = {
      timestamp: new Date().toISOString(),
      clientReport: {
        incognitoDetected: incognitoResult,
        userAgent,
        hasLocalStorage,
        storageQuota,
        fileSystemAPIAvailable,
        testResults,
      },
      serverInfo: {
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        userAgent: req.headers.get('user-agent'),
      },
      recommendation: incognitoResult
        ? "✅ Incognito detected correctly - should block"
        : "⚠️ Incognito NOT detected - may allow access when it shouldn't"
    };

    console.log('[INCOGNITO DIAGNOSTIC]', JSON.stringify(diagnostics, null, 2));

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to process incognito test',
      message: error.message,
    }, { status: 500 });
  }
}
