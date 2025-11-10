import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

interface ImageItem {
  url: string
  caption: string
  width: number
  height: number
}

interface AboutContent {
  id: string
  title: string
  content: string
  images: ImageItem[]
  gridImages?: ImageItem[]
  section: 'company' | 'staff' | 'equipment'
  updatedAt: string
}

export async function GET() {
  try {
    const db = await getDatabase()
    const aboutData = await db.collection('about').find({}).toArray()
    return NextResponse.json(aboutData)
  } catch (error) {
    console.error('[About API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch about data', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, title, content, images, gridImages } = body

    if (!section) {
      return NextResponse.json({ error: 'Missing section field' }, { status: 400 })
    }

    const db = await getDatabase()
    const existing = await db.collection('about').findOne({ section })

    const newContent: AboutContent = {
      id: existing?.id || `about-${section}-${Date.now()}`,
      title: title || '',
      content: content || '',
      images: images || [],
      gridImages: gridImages || [],
      section,
      updatedAt: new Date().toISOString()
    }

    await db.collection('about').updateOne(
      { section },
      { $set: newContent },
      { upsert: true }
    )

    return NextResponse.json(newContent)
  } catch (error) {
    console.error('[About API] Error saving:', error)
    return NextResponse.json({ error: 'Failed to save about data', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
    }

    const db = await getDatabase()
    await db.collection('about').deleteOne({ id })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[About API] Error deleting:', error)
    return NextResponse.json({ error: 'Failed to delete about data', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
