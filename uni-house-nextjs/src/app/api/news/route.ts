import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const db = await getDatabase()
    const articles = await db.collection('news').find({}).toArray()
    
    if (articles.length === 0) {
      try {
        const filePath = path.join(process.cwd(), 'src/data/news.ts')
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const articlesMatch = fileContent.match(/export const newsArticles: NewsItem\[\] = (\[[\s\S]*?\n\])/m)
        if (articlesMatch) {
          const articlesData = eval(articlesMatch[1])
          if (articlesData.length > 0) {
            await db.collection('news').insertMany(articlesData)
          }
          return NextResponse.json({ articles: articlesData })
        }
      } catch (fileError) {
        console.log('[News API] No file data to migrate')
      }
    }
    
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('[News API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    if (!body || body.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }
    
    const { articles } = JSON.parse(body)
    const db = await getDatabase()
    
    await db.collection('news').deleteMany({})
    if (articles.length > 0) {
      await db.collection('news').insertMany(articles)
    }
    
    return NextResponse.json({ success: true, message: 'News saved to database!' })
  } catch (error) {
    console.error('[News API] Error saving:', error)
    return NextResponse.json({ error: 'Failed to save news' }, { status: 500 })
  }
}
