export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

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
    const collection = db.collection('shorts');
    const shorts = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, shorts }, { status: 200 });
  } catch (error) {
    console.error('Fetch Shorts Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { platform, embedUrl, handle } = data;

    if (!platform || !embedUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const dbClient = await clientPromise;
    const db = dbClient.db();
    const collection = db.collection('shorts');

    const result = await collection.insertOne({
      platform,
      embedUrl,
      handle: handle || '@synapselab',
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Create Short Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const dbClient = await clientPromise;
    const db = dbClient.db();
    const collection = db.collection('shorts');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Short not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Delete Short Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

