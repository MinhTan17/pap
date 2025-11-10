import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const db = await getDatabase()
    const banners = await db.collection('banners').find({}).toArray()
    
    return NextResponse.json(banners)
  } catch (error) {
    console.error('[Banners API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch banners', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const banners = await request.json()
    
    if (!Array.isArray(banners)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }
    
    const db = await getDatabase()
    
    await db.collection('banners').deleteMany({})
    if (banners.length > 0) {
      await db.collection('banners').insertMany(banners)
    }
    
    return NextResponse.json({ success: true, message: 'Banners saved to database!' })
  } catch (error) {
    console.error('[Banners API] Error saving:', error)
    return NextResponse.json({ error: 'Failed to save banners', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
