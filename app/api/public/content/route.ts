import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/synapselab';
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export async function GET() {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db();
    
    // Fetch both collections in parallel
    const [updates, shorts] = await Promise.all([
      db.collection('updates').find({}).sort({ year: 1 }).toArray(), // Oldest first or customize sort
      db.collection('shorts').find({}).sort({ createdAt: -1 }).toArray()
    ]);
    
    return NextResponse.json({ success: true, updates, shorts }, { status: 200 });
  } catch (error) {
    console.error('Fetch Public Content Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
