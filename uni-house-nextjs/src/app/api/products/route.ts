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
    const products = await db.collection('products').find({}).toArray()
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('[Products API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check content length - increased to 50MB
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'Request body too large (max 50MB)' }, { status: 413 })
    }

    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }

    const products = JSON.parse(body)
    
    if (!Array.isArray(products)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }
    
    const db = await getDatabase()
    
    // Clear existing products and insert new ones
    await db.collection('products').deleteMany({})
    if (products.length > 0) {
      await db.collection('products').insertMany(products)
    }
    
    return NextResponse.json({ success: true, message: 'Products saved to database!' })
  } catch (error) {
    console.error('[Products API] Error saving:', error)
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 })
    }
    return NextResponse.json({ 
      error: 'Failed to save products', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
