export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Initialize MongoDB client outside of request handler for connection pooling
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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, address, transactionId, method, serviceId, serviceName, amount } = data;

    if (!name || !email || !phone || !address || !method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Connect to database
    const dbClient = await clientPromise;
    const db = dbClient.db();
    
    // Log transaction
    const collection = db.collection('orders');
    const newOrder = {
      name,
      email,
      phone,
      address,
      transactionId: transactionId || null,
      method,
      serviceId,
      serviceName,
      amount,
      status: method === 'FamApp' ? 'pending_verification' : 'processing',
      createdAt: new Date()
    };

    const result = await collection.insertOne(newOrder);

    return NextResponse.json({ 
      success: true, 
      message: 'Order placed successfully',
      orderId: result.insertedId
    }, { status: 200 });
    
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

