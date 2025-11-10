import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const db = await getDatabase()
    const banners = await db.collection('banners').find({}).toArray()
    
    if (banners.length === 0) {
      try {
        const filePath = path.join(process.cwd(), 'src/data/banners.ts')
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const match = fileContent.match(/export const initialBanners: BannerSlide\[\] = (\[[\s\S]*?\])/m)
        if (match) {
          const bannersStr = match[1]
          const bannersData = eval(bannersStr)
          if (bannersData.length > 0) {
            await db.collection('banners').insertMany(bannersData)
          }
          return NextResponse.json(bannersData)
        }
      } catch (fileError) {
        console.log('[Banners API] No file data to migrate')
      }
    }
    
    return NextResponse.json(banners)
  } catch (error) {
    console.error('[Banners API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }
    
    const banners = JSON.parse(body)
    const db = await getDatabase()
    
    await db.collection('banners').deleteMany({})
    if (banners.length > 0) {
      await db.collection('banners').insertMany(banners)
    }
    
    return NextResponse.json({ success: true, message: 'Banners saved to database!' })
  } catch (error) {
    console.error('[Banners API] Error saving:', error)
    return NextResponse.json({ error: 'Failed to save banners' }, { status: 500 })
  }
}
