import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

// Configure body size limit for this route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}

export const maxDuration = 60 // Maximum execution time in seconds
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = await getDatabase()
    const articles = await db.collection('news').find({}).toArray()
    
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('[News API] Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch news', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check content length
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 })
    }

    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }
    
    const { articles } = JSON.parse(body)
    
    if (!Array.isArray(articles)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }
    
    const db = await getDatabase()
    
    await db.collection('news').deleteMany({})
    if (articles.length > 0) {
      await db.collection('news').insertMany(articles)
    }
    
    return NextResponse.json({ success: true, message: 'News saved to database!' })
  } catch (error) {
    console.error('[News API] Error saving:', error)
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 })
    }
    return NextResponse.json({ 
      error: 'Failed to save news', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
