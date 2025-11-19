import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    console.log('[Debug Services] Checking MongoDB connection...')
    console.log('[Debug Services] MONGODB_URI exists:', !!process.env.MONGODB_URI)
    
    const db = await getDatabase()
    console.log('[Debug Services] Connected to database')
    
    const count = await db.collection('services').countDocuments()
    console.log('[Debug Services] Services count:', count)
    
    const services = await db.collection('services').find({}).limit(3).toArray()
    console.log('[Debug Services] Sample services:', services.length)
    
    return NextResponse.json({
      success: true,
      mongodbUriExists: !!process.env.MONGODB_URI,
      servicesCount: count,
      sampleServices: services.map(s => ({
        id: s.id,
        title: s.title,
        hasDetailContent: !!s.detailContent
      }))
    })
  } catch (error) {
    console.error('[Debug Services] Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      mongodbUriExists: !!process.env.MONGODB_URI
    }, { status: 500 })
  }
}
