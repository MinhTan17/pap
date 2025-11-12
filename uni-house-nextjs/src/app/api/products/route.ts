import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

// Note: export const config doesn't work in App Router
// Body size is handled manually in the POST handler
// Vercel has a hard limit of 4.5MB for serverless functions

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
  const environment = process.env.VERCEL ? 'Vercel' : 'Local'
  
  try {
    // Check content length FIRST (before reading body)
    const contentLength = request.headers.get('content-length')
    const maxSize = 10 * 1024 * 1024 // 10MB
    
    console.log(`[Products API] ${environment} - POST request:`, {
      contentLength: contentLength ? `${(parseInt(contentLength) / 1024 / 1024).toFixed(2)}MB` : 'unknown',
      maxAllowed: '10MB'
    })
    
    if (contentLength && parseInt(contentLength) > maxSize) {
      const actualSize = (parseInt(contentLength) / 1024 / 1024).toFixed(2)
      return NextResponse.json({ 
        error: `Request body too large (max 10MB)`,
        details: `Your request size: ${actualSize}MB. Please reduce the payload size or split into multiple requests.`,
        actualSize: `${actualSize}MB`,
        maxSize: '10MB'
      }, { status: 413 })
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
    
    console.log(`[Products API] ${environment} - Successfully saved ${products.length} products`)
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
