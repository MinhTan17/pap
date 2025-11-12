import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export const maxDuration = 60

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      hasMongoUri: !!process.env.MONGODB_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasCloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
    },
    mongodb: {
      connected: false,
      error: null as string | null,
      collections: [] as string[],
    }
  }

  try {
    const db = await getDatabase()
    health.mongodb.connected = true
    
    const collections = await db.listCollections().toArray()
    health.mongodb.collections = collections.map(c => c.name)
    
    // Count documents in each collection
    const counts: Record<string, number> = {}
    for (const coll of collections) {
      counts[coll.name] = await db.collection(coll.name).countDocuments()
    }
    
    return NextResponse.json({
      ...health,
      mongodb: {
        ...health.mongodb,
        counts
      }
    })
  } catch (error) {
    health.mongodb.error = error instanceof Error ? error.message : 'Unknown error'
    health.status = 'error'
    
    return NextResponse.json(health, { status: 500 })
  }
}
