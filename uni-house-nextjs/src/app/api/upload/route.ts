import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { base64, filename, folder } = await request.json()
    
    // Check if it's base64
    if (!base64.startsWith('data:image/')) {
      return NextResponse.json({ 
        success: false, 
        message: 'Not a base64 image' 
      })
    }
    
    // Extract image data
    const matches = base64.match(/^data:image\/(\w+);base64,(.+)$/)
    if (!matches) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid base64 format' 
      })
    }
    
    const extension = matches[1]
    const data = matches[2]
    const buffer = Buffer.from(data, 'base64')
    
    // Generate filename
    const timestamp = Date.now()
    const finalFilename = filename || `image-${timestamp}.${extension}`
    
    // Create directory if not exists
    const uploadDir = path.join(process.cwd(), 'public', folder || 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    
    // Save file
    const filePath = path.join(uploadDir, finalFilename)
    fs.writeFileSync(filePath, buffer)
    
    // Return public path
    const publicPath = `/${folder || 'uploads'}/${finalFilename}`
    
    return NextResponse.json({ 
      success: true, 
      path: publicPath,
      message: 'Image uploaded successfully!' 
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Upload failed' 
    }, { status: 500 })
  }
}
