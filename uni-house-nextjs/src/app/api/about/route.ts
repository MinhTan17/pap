import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

// Configure body size limit for this route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export const maxDuration = 60 // Maximum execution time in seconds

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
    // Check content length
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 })
    }

    const bodyText = await request.text()
    if (!bodyText || bodyText.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }

    const body = JSON.parse(bodyText)
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
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 })
    }
    return NextResponse.json({ 
      error: 'Failed to save about data', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
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
