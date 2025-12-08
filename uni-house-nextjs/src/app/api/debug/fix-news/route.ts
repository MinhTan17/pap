import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = await getDatabase()
    
    // Get all news articles
    const allArticles = await db.collection('news').find({}).toArray()
    console.log('Total articles before cleanup:', allArticles.length)
    
    // Remove duplicates by ID - keep only first occurrence
    const uniqueArticles = allArticles.filter(
      (article, index, self) => 
        index === self.findIndex((a) => a.id === article.id)
    )
    console.log('Unique articles after cleanup:', uniqueArticles.length)
    
    // Clear and re-insert unique articles
    await db.collection('news').deleteMany({})
    if (uniqueArticles.length > 0) {
      // Remove MongoDB _id to avoid conflicts
      const cleanArticles = uniqueArticles.map(({ _id, ...rest }) => rest)
      await db.collection('news').insertMany(cleanArticles)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'News duplicates removed!',
      before: allArticles.length,
      after: uniqueArticles.length,
      removed: allArticles.length - uniqueArticles.length
    })
  } catch (error) {
    console.error('[Fix News API] Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fix news', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
