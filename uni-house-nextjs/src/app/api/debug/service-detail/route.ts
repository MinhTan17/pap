import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id') || '1'
    
    const db = await getDatabase()
    const service = await db.collection('services').findOne({ id: parseInt(id) })
    
    if (!service) {
      return NextResponse.json({ 
        error: 'Service not found',
        id: id 
      }, { status: 404 })
    }
    
    // Return detailed info
    return NextResponse.json({
      success: true,
      service: {
        id: service.id,
        title: service.title,
        description: service.description,
        hasDetailContent: !!service.detailContent,
        detailContentLength: service.detailContent?.length || 0,
        detailContentPreview: service.detailContent?.substring(0, 200) || '',
        fullService: service
      }
    })
  } catch (error) {
    console.error('[Debug Service Detail] Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch service', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
