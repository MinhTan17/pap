import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/products.ts')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    const match = fileContent.match(/export const products: ProductItem\[\] = (\[[\s\S]*?\n\])/m)
    if (match) {
      const productsStr = match[1]
      const products = eval(productsStr)
      return NextResponse.json(products)
    }
    
    return NextResponse.json({ error: 'Could not parse products' }, { status: 500 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const products = await request.json()
    
    const filePath = path.join(process.cwd(), 'src/data/products.ts')
    const originalContent = fs.readFileSync(filePath, 'utf-8')
    
    // Keep categories unchanged
    const categoriesMatch = originalContent.match(/export const categories: ProductCategory\[\] = (\[[\s\S]*?\n\])/m)
    const categoriesStr = categoriesMatch ? categoriesMatch[1] : '[]'
    
    const fileContent = `export interface ProductItem {
  id: number
  name: string
  category: string
  description: string
  image: string
  images?: string[]
  gallery?: string[]
  color?: string
  price?: string
  specifications?: {
    material?: string
    thickness?: string
    size?: string
    standard?: string
    origin?: string
    [key: string]: string | undefined
  }
}

export interface ProductCategory {
  id: string
  name: string
  description?: string
}

export const products: ProductItem[] = ${JSON.stringify(products, null, 2)}

export const categories: ProductCategory[] = ${categoriesStr}
`
    
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    
    return NextResponse.json({ success: true, message: 'Products saved!' })
  } catch (error) {
    console.error('Error saving products:', error)
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 })
  }
}
