import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'NOT_SET',
    hasApiKey: !!process.env.CLOUDINARY_API_KEY,
    hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
    apiKeyLength: process.env.CLOUDINARY_API_KEY?.length || 0,
    apiSecretLength: process.env.CLOUDINARY_API_SECRET?.length || 0,
  });
}
