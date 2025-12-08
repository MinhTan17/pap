import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    return NextResponse.json({ 
      error: 'MONGODB_URI not configured',
      hasUri: false 
    }, { status: 500 });
  }

  try {
    console.log('Testing MongoDB connection...');
    console.log('URI prefix:', uri.substring(0, 30) + '...');
    
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Test ping
    await client.db('admin').command({ ping: 1 });
    console.log('Ping successful');
    
    // List databases
    const dbs = await client.db().admin().listDatabases();
    console.log('Databases:', dbs.databases.map(d => d.name));
    
    // Check unihouse database
    const db = client.db('unihouse');
    const collections = await db.listCollections().toArray();
    console.log('Collections in unihouse:', collections.map(c => c.name));
    
    await client.close();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      databases: dbs.databases.map(d => d.name),
      collections: collections.map(c => c.name),
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({
      error: 'MongoDB connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
