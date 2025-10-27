import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    // Check if it's formData or JSON
    const contentType = request.headers.get('content-type') || ''

    let file: File | null = null
    let section: string = 'about'
    let base64: string = ''

    if (contentType.includes('multipart/form-data')) {
      // Handle formData
      const formData = await request.formData()
      file = formData.get('file') as File
      section = (formData.get('section') as string) || 'about'
    } else if (contentType.includes('application/json')) {
      // Handle JSON with base64
      const body = await request.json()
      base64 = body.base64
      section = body.folder || 'about'
    } else {
      return NextResponse.json({
        success: false,
        message: 'Unsupported content type'
      }, { status: 400 })
    }

    if (!file && !base64) {
      return NextResponse.json({
        success: false,
        message: 'No file or base64 provided'
      }, { status: 400 })
    }

    // Generate filename
    const timestamp = Date.now()
    const extension = file ? (file.name.split('.').pop() || 'jpg') : 'png' // Default for base64
    const finalFilename = `${section.replace('/', '-')}-${timestamp}.${extension}`

    // Create directory if not exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', section)
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    let buffer: Buffer

    if (file) {
      // Handle file upload
      const bytes = await file.arrayBuffer()
      buffer = Buffer.from(bytes)
    } else {
      // Handle base64
      const matches = base64.match(/^data:image\/([a-zA-Z]*);base64,([^"]*)$/)
      if (!matches) {
        return NextResponse.json({
          success: false,
          message: 'Invalid base64 format'
        }, { status: 400 })
      }
      const base64Data = matches[2]
      buffer = Buffer.from(base64Data, 'base64')
    }

    // Save file
    const filePath = path.join(uploadDir, finalFilename)
    fs.writeFileSync(filePath, buffer)

    // Return public path
    const publicPath = `/uploads/${section}/${finalFilename}`

    return NextResponse.json({
      success: true,
      path: publicPath,
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
