// Test MongoDB connection
const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI is not set');
    process.exit(1);
  }

  console.log('🔍 Testing MongoDB connection...');
  console.log('URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB successfully');

    const db = client.db();
    console.log('📊 Database name:', db.databaseName);

    // List collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name).join(', '));

    // Count documents in each collection
    for (const coll of collections) {
      const count = await db.collection(coll.name).countDocuments();
      console.log(`  - ${coll.name}: ${count} documents`);
    }

    console.log('\n✅ MongoDB connection test passed!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

testConnection();
