import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const section = formData.get('section') as string
    
    if (!file) {
      return NextResponse.json({ 
        success: false, 
        message: 'No file provided' 
      }, { status: 400 })
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ 
        success: false, 
        message: 'File must be an image' 
      }, { status: 400 })
    }
    
    // Generate filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop() || 'jpg'
    const finalFilename = `${section || 'about'}-${timestamp}.${extension}`
    
    // Create directory if not exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'about')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Save file
    const filePath = path.join(uploadDir, finalFilename)
    fs.writeFileSync(filePath, buffer)
    
    // Return public path
    const publicPath = `/uploads/about/${finalFilename}`
    
    return NextResponse.json({ 
      success: true, 
      url: publicPath,
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
