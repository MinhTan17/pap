import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    const debugInfo = {
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 30) + '...' : null,
      envVarsSet: {
        JWT_SECRET: !!process.env.JWT_SECRET,
        ADMIN_USERNAME: !!process.env.ADMIN_USERNAME,
        ADMIN_PASSWORD_HASH: !!process.env.ADMIN_PASSWORD_HASH,
      },
      nodeEnv: process.env.NODE_ENV,
    };

    if (token) {
      const payload = verifyToken(token);
      debugInfo.tokenValid = !!payload;
      debugInfo.payload = payload;
    }

    return NextResponse.json(debugInfo);
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
