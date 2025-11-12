import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '@/lib/auth'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Note: export const config doesn't work in App Router
// Vercel has a hard 4.5MB limit for serverless functions
// For larger files, use direct upload to Cloudinary via /api/upload/signature

export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const environment = process.env.VERCEL ? 'Vercel' : 'Local'
  const contentLength = request.headers.get('content-length')
  
  console.log(`[Upload API] ${environment} - Request:`, {
    contentLength: contentLength ? `${(parseInt(contentLength) / 1024 / 1024).toFixed(2)}MB` : 'unknown',
    vercelLimit: '4.5MB',
    recommendation: contentLength && parseInt(contentLength) > 4 * 1024 * 1024 
      ? 'Use direct Cloudinary upload for files > 4MB' 
      : 'OK'
  })
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '') || 
                  request.cookies.get('auth-token')?.value ||
                  request.cookies.get('auth-token-fallback')?.value

    if (!token) {
      console.log('[Upload] No token provided')
      return NextResponse.json(
        { success: false, message: 'Unauthorized - No token' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      console.log('[Upload] Invalid token')
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }

    console.log('[Upload] Authenticated user:', payload.username)

    // Log environment variables (without exposing secrets)
    console.log('[Upload] Cloudinary config:', {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
    })

    const contentType = request.headers.get('content-type') || ''
    let base64Data: string
    let folder = 'general'

    // Handle JSON request (base64)
    if (contentType.includes('application/json')) {
      const body = await request.json()
      base64Data = body.base64
      folder = body.folder || 'general'

      if (!base64Data) {
        return NextResponse.json(
          { success: false, message: 'No base64 data provided' },
          { status: 400 }
        )
      }

      // Validate base64 format
      if (!base64Data.startsWith('data:image/')) {
        return NextResponse.json(
          { success: false, message: 'Invalid base64 image format' },
          { status: 400 }
        )
      }
    }
    // Handle FormData request
    else {
      const formData = await request.formData()
      const file = formData.get('file') as File
      folder = (formData.get('section') as string) || 'general'

      if (!file) {
        return NextResponse.json(
          { success: false, message: 'No file provided' },
          { status: 400 }
        )
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      if (!validTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: 'Chỉ chấp nhận file ảnh (JPG, PNG, WEBP, GIF)' },
          { status: 400 }
        )
      }

      // Validate file size (3MB for Vercel compatibility)
      // Base64 encoding increases size by ~33%, so 3MB file becomes ~4MB
      // For larger files, use direct Cloudinary upload via /api/upload/signature
      const maxSize = 3 * 1024 * 1024 // 3MB (safe for Vercel after base64 encoding)
      if (file.size > maxSize) {
        const actualSizeMB = (file.size / 1024 / 1024).toFixed(2)
        return NextResponse.json(
          { 
            success: false, 
            message: `File quá lớn (${actualSizeMB}MB). Giới hạn: 3MB. Sử dụng direct upload cho file lớn hơn.`,
            actualSize: `${actualSizeMB}MB`,
            maxSize: '3MB',
            recommendation: 'Use direct Cloudinary upload for files > 3MB'
          },
          { status: 413 }
        )
      }

      // Convert file to base64
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const mimeType = file.type
      base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`
      
      console.log(`[Upload] File converted to base64:`, {
        originalSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        base64Size: `${(base64Data.length / 1024 / 1024).toFixed(2)}MB`,
        increase: `${((base64Data.length / file.size - 1) * 100).toFixed(1)}%`
      })
    }

    // Upload to Cloudinary using base64
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: `uni-house/${folder}`,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    })

    return NextResponse.json({
      success: true,
      path: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    })

  } catch (error: any) {
    console.error('[Upload] Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })
    
    // Provide more specific error messages
    let errorMessage = 'Upload failed'
    if (error.message?.includes('Invalid API key')) {
      errorMessage = 'Lỗi cấu hình Cloudinary API Key'
    } else if (error.message?.includes('Invalid cloud name')) {
      errorMessage = 'Lỗi cấu hình Cloudinary Cloud Name'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage, error: error.message },
      { status: 500 }
    )
  }
}
