import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '@/lib/auth'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const dynamic = 'force-dynamic'

/**
 * Generate Cloudinary signature for client-side upload
 * This allows direct upload from browser to Cloudinary, bypassing Vercel's 4.5MB limit
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '') || 
                  request.cookies.get('auth-token')?.value ||
                  request.cookies.get('auth-token-fallback')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - No token' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { folder = 'general' } = body

    // Generate timestamp
    const timestamp = Math.round(new Date().getTime() / 1000)

    // Parameters for upload - only include what will be signed
    // IMPORTANT: All parameters here MUST be sent in the upload request
    const uploadFolder = `uni-house/${folder}`
    const params: Record<string, any> = {
      timestamp,
      folder: uploadFolder,
    }

    // Generate signature using Cloudinary's method
    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET!
    )

    console.log('[Upload Signature] Generated:', {
      params,
      signature: signature.substring(0, 10) + '...',
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY?.substring(0, 5) + '...',
    })

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: uploadFolder,
    })

  } catch (error: any) {
    console.error('[Upload Signature] Error:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}
