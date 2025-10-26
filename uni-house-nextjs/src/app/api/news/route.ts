import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/news.ts')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    const articlesMatch = fileContent.match(/export const newsArticles: NewsItem\[\] = (\[[\s\S]*?\n\])/m)
    
    const articles = articlesMatch ? eval(articlesMatch[1]) : []
    
    return NextResponse.json({ articles })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read news' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Clone request to avoid body already read errors
    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }
    
    const { articles } = JSON.parse(body)
    
    const filePath = path.join(process.cwd(), 'src/data/news.ts')
    
    const fileContent = `export interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  detailContent?: string
  image: string
  date: string
  category: string
  author?: string
  readTime?: string
  icon?: string
  color?: string
  description?: string
}

export const newsArticles: NewsItem[] = ${JSON.stringify(articles, null, 2)}
`
    
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    
    return NextResponse.json({ success: true, message: 'News saved!' })
  } catch (error) {
    console.error('Error saving news:', error)
    return NextResponse.json({ error: 'Failed to save news' }, { status: 500 })
  }
}
