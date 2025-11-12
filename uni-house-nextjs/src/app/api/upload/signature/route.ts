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

    // Parameters for upload
    const params = {
      timestamp,
      folder: `uni-house/${folder}`,
      transformation: 'q_auto,f_auto',
    }

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET!
    )

    return NextResponse.json({
      success: true,
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: params.folder,
    })

  } catch (error: any) {
    console.error('[Upload Signature] Error:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}
