import { NextResponse } from 'next/server';

export async function GET() {
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
  
  return NextResponse.json({
    hasJwtSecret: !!process.env.JWT_SECRET,
    jwtSecretLength: jwtSecret.length,
    jwtSecretPreview: jwtSecret.substring(0, 20) + '...',
    usingFallback: !process.env.JWT_SECRET,
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('JWT') || key.includes('SECRET') || key.includes('ADMIN')
    ),
  });
}
