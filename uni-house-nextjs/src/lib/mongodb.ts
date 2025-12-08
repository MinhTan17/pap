import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('MongoDB URI is not configured. Please add MONGODB_URI to environment variables.');
  }
  
  const newClient = new MongoClient(uri, options);
  return newClient.connect();
}

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClient();
    }
    clientPromise = global._mongoClientPromise!;
  } else {
    clientPromise = createClient();
  }
}

export async function getDatabase(): Promise<Db> {
  if (!uri) {
    throw new Error('MongoDB URI is not configured. Please add MONGODB_URI to environment variables.');
  }
  
  try {
    if (!clientPromise) {
      clientPromise = createClient();
    }
    
    const connectedClient = await clientPromise;
    
    // Test connection
    await connectedClient.db('admin').command({ ping: 1 });
    
    return connectedClient.db('unihouse');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    // Reset connection and retry once
    clientPromise = null;
    if (process.env.NODE_ENV === 'development') {
      global._mongoClientPromise = undefined;
    }
    
    // Retry connection
    clientPromise = createClient();
    const connectedClient = await clientPromise;
    return connectedClient.db('unihouse');
  }
}

export default clientPromise;
