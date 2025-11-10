import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const db = await getDatabase()
    const services = await db.collection('services').find({}).toArray()
    
    return NextResponse.json(services)
  } catch (error) {
    console.error('[Services API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch services', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const services = await request.json()
    
    if (!Array.isArray(services)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }
    
    const db = await getDatabase()
    
    await db.collection('services').deleteMany({})
    if (services.length > 0) {
      await db.collection('services').insertMany(services)
    }
    
    return NextResponse.json({ success: true, message: 'Services saved to database!' })
  } catch (error) {
    console.error('[Services API] Error saving:', error)
    return NextResponse.json({ error: 'Failed to save services', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
