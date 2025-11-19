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
    const services = await db.collection('services').find({}).toArray()
    
    // Transform MongoDB documents to remove _id and ensure proper format
    const transformedServices = services.map(service => {
      const { _id, ...rest } = service
      return rest
    })
    
    console.log('[Services API] Returning', transformedServices.length, 'services')
    return NextResponse.json(transformedServices)
  } catch (error) {
    console.error('[Services API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch services', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const environment = process.env.VERCEL ? 'Vercel' : 'Local'
  
  try {
    // Check content length FIRST (before reading body)
    const contentLength = request.headers.get('content-length')
    const maxSize = 50 * 1024 * 1024 // 50MB
    
    console.log(`[Services API] ${environment} - POST request:`, {
      contentLength: contentLength ? `${(parseInt(contentLength) / 1024 / 1024).toFixed(2)}MB` : 'unknown',
      maxAllowed: '50MB'
    })
    
    if (contentLength && parseInt(contentLength) > maxSize) {
      const actualSize = (parseInt(contentLength) / 1024 / 1024).toFixed(2)
      return NextResponse.json({ 
        error: `Request body too large (max 50MB)`,
        details: `Your request size: ${actualSize}MB. Please reduce the payload size or split into multiple requests.`,
        actualSize: `${actualSize}MB`,
        maxSize: '50MB'
      }, { status: 413 })
    }

    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }

    const services = JSON.parse(body)
    
    if (!Array.isArray(services)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }
    
    const db = await getDatabase()
    
    await db.collection('services').deleteMany({})
    if (services.length > 0) {
      await db.collection('services').insertMany(services)
    }
    
    console.log(`[Services API] ${environment} - Successfully saved ${services.length} services`)
    return NextResponse.json({ success: true, message: 'Services saved to database!' })
  } catch (error) {
    console.error('[Services API] Error saving:', error)
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 })
    }
    return NextResponse.json({ 
      error: 'Failed to save services', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
