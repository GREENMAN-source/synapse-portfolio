import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/synapselab';
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export async function GET() {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db();

    // Seed Updates
    const updatesCollection = db.collection('updates');
    await updatesCollection.deleteMany({});
    await updatesCollection.insertMany([
      { year: '2022', title: 'Hardware Awakening', description: 'Started with Arduino, diving into circuits, C++, and microcontrollers.', color: '#00E5FF', createdAt: new Date() },
      { year: '2023', title: 'The Code Matrix', description: 'Began serious coding. Mastered fundamentals of programming logic.', color: '#00E5FF', createdAt: new Date() },
      { year: '2025', title: 'Web Architecture', description: 'Transitioned to Web Development, building modern React/Next.js apps.', color: '#EC4899', createdAt: new Date() },
      { year: '2026', title: 'Offensive Security', description: 'Entered Ethical Hacking & Bug Bounty. Founded Synapse Lab.', color: '#EC4899', createdAt: new Date() }
    ]);

    // Seed Shorts
    const shortsCollection = db.collection('shorts');
    await shortsCollection.deleteMany({});
    await shortsCollection.insertMany([
      { platform: 'YouTube', embedUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk', handle: '@SYNAPSE_LAB_IN', createdAt: new Date() },
      { platform: 'Instagram', embedUrl: 'https://www.instagram.com/p/C-X-wEFSq3T/embed', handle: '@dhanvanth_l.p', createdAt: new Date() }
    ]);

    return NextResponse.json({ success: true, message: 'Database successfully seeded with timeline and shorts!' }, { status: 200 });
  } catch (error) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
