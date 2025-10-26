import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/services.ts')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    const match = fileContent.match(/export const services: ServiceItem\[\] = (\[[\s\S]*?\n\])/m)
    if (match) {
      const servicesStr = match[1]
      const services = eval(servicesStr)
      return NextResponse.json(services)
    }
    
    return NextResponse.json({ error: 'Could not parse services' }, { status: 500 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Clone request to avoid body already read errors
    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }
    
    const services = JSON.parse(body)
    
    const filePath = path.join(process.cwd(), 'src/data/services.ts')
    
    const fileContent = `export interface ServiceItem {
  id: number
  title: string
  description: string
  icon?: string
  image?: string
  features?: string[]
  color?: string
}

export const services: ServiceItem[] = ${JSON.stringify(services, null, 2)}
`
    
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    
    return NextResponse.json({ success: true, message: 'Services saved!' })
  } catch (error) {
    console.error('Error saving services:', error)
    return NextResponse.json({ error: 'Failed to save services' }, { status: 500 })
  }
}
