import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/banners.ts')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // Extract banners array from file
    const match = fileContent.match(/export const initialBanners: BannerSlide\[\] = (\[[\s\S]*?\])/m)
    if (match) {
      const bannersStr = match[1]
      // Convert to JSON-compatible format
      const banners = eval(bannersStr)
      return NextResponse.json(banners)
    }
    
    return NextResponse.json({ error: 'Could not parse banners' }, { status: 500 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read banners' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Clone request to avoid body already read errors
    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }
    
    const banners = JSON.parse(body)
    
    const filePath = path.join(process.cwd(), 'src/data/banners.ts')
    
    // Generate TypeScript code
    const fileContent = `export interface BannerSlide {
  id: number
  title: string
  subtitle: string
  description: string
  gradient: string
  image?: string
  imageAlt?: string
  link?: string
}

export const initialBanners: BannerSlide[] = ${JSON.stringify(banners, null, 2)}
`
    
    // Write to file
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    
    return NextResponse.json({ success: true, message: 'Banners saved to file!' })
  } catch (error) {
    console.error('Error saving banners:', error)
    return NextResponse.json({ error: 'Failed to save banners' }, { status: 500 })
  }
}
