import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const db = await getDatabase()
    const services = await db.collection('services').find({}).toArray()
    
    if (services.length === 0) {
      try {
        const filePath = path.join(process.cwd(), 'src/data/services.ts')
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const match = fileContent.match(/export const services: ServiceItem\[\] = (\[[\s\S]*?\n\])/m)
        if (match) {
          const servicesStr = match[1]
          const servicesData = eval(servicesStr)
          if (servicesData.length > 0) {
            await db.collection('services').insertMany(servicesData)
          }
          return NextResponse.json(servicesData)
        }
      } catch (fileError) {
        console.log('[Services API] No file data to migrate')
      }
    }
    
    return NextResponse.json(services)
  } catch (error) {
    console.error('[Services API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }
    
    const services = JSON.parse(body)
    const db = await getDatabase()
    
    await db.collection('services').deleteMany({})
    if (services.length > 0) {
      await db.collection('services').insertMany(services)
    }
    
    return NextResponse.json({ success: true, message: 'Services saved to database!' })
  } catch (error) {
    console.error('[Services API] Error saving:', error)
    return NextResponse.json({ error: 'Failed to save services' }, { status: 500 })
  }
}
