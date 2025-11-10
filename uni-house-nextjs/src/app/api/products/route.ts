import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const db = await getDatabase()
    const products = await db.collection('products').find({}).toArray()
    
    // If no products in DB, try to load from file (first time migration)
    if (products.length === 0) {
      try {
        const filePath = path.join(process.cwd(), 'src/data/products.ts')
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const match = fileContent.match(/export const products: ProductItem\[\] = (\[[\s\S]*?\n\])/m)
        if (match) {
          const productsStr = match[1]
          const productsData = eval(productsStr)
          // Save to DB for future use
          if (productsData.length > 0) {
            await db.collection('products').insertMany(productsData)
          }
          return NextResponse.json(productsData)
        }
      } catch (fileError) {
        console.log('[Products API] No file data to migrate')
      }
    }
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('[Products API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }
    
    const products = JSON.parse(body)
    
    const db = await getDatabase()
    
    // Clear existing products and insert new ones
    await db.collection('products').deleteMany({})
    if (products.length > 0) {
      await db.collection('products').insertMany(products)
    }
    
    return NextResponse.json({ success: true, message: 'Products saved to database!' })
  } catch (error) {
    console.error('[Products API] Error saving:', error)
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 })
  }
}
