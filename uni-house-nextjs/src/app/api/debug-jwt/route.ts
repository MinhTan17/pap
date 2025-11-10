import { NextResponse } from 'next/server';

export async function GET() {
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
  
  return NextResponse.json({
    hasJwtSecret: !!process.env.JWT_SECRET,
    jwtSecretLength: jwtSecret.length,
    jwtSecretPreview: jwtSecret.substring(0, 10) + '...' + jwtSecret.substring(jwtSecret.length - 10),
    isUsingFallback: !process.env.JWT_SECRET,
  });
}
