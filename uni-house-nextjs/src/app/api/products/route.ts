import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

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
    const products = await request.json()
    
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
    return NextResponse.json({ error: 'Failed to save products', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
