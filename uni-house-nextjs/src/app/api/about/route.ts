import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface ImageItem {
  url: string
  caption: string
  width: number
  height: number
}

interface AboutContent {
  id: string
  title: string
  content: string
  images: ImageItem[]
  gridImages?: ImageItem[] // 6 ảnh nhỏ hiển thị dưới dạng grid
  section: 'company' | 'staff' | 'equipment'
  updatedAt: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'about.json')

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read about data
const readAboutData = (): AboutContent[] => {
  try {
    ensureDataDir()
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading about data:', error)
  }
  return []
}

// Write about data
const writeAboutData = (data: AboutContent[]) => {
  try {
    ensureDataDir()
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing about data:', error)
    throw error
  }
}

export async function GET() {
  try {
    const aboutData = readAboutData()
    return NextResponse.json(aboutData)
  } catch (error) {
    console.error('Error fetching about data:', error)
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, title, content, images, gridImages } = body

    if (!section) {
      return NextResponse.json({ error: 'Missing section field' }, { status: 400 })
    }

    const aboutData = readAboutData()
    const existingIndex = aboutData.findIndex(item => item.section === section)

    const newContent: AboutContent = {
      id: existingIndex >= 0 ? aboutData[existingIndex].id : `about-${section}-${Date.now()}`,
      title: title || '',
      content: content || '',
      images: images || [],
      gridImages: gridImages || [],
      section,
      updatedAt: new Date().toISOString()
    }

    if (existingIndex >= 0) {
      aboutData[existingIndex] = newContent
    } else {
      aboutData.push(newContent)
    }

    writeAboutData(aboutData)

    return NextResponse.json(newContent)
  } catch (error) {
    console.error('Error saving about data:', error)
    return NextResponse.json({ error: 'Failed to save about data' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
    }

    const aboutData = readAboutData()
    const filteredData = aboutData.filter(item => item.id !== id)
    
    writeAboutData(filteredData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting about data:', error)
    return NextResponse.json({ error: 'Failed to delete about data' }, { status: 500 })
  }
}
