
const { MongoClient } = require('mongodb');

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('updates');

    // Clear existing to avoid duplicates if run multiple times
    await collection.deleteMany({});

    const events = [
      {
        year: '2022',
        title: 'Hardware Awakening',
        description: 'Started with Arduino, diving into circuits, C++, and microcontrollers.',
        color: '#00E5FF',
        createdAt: new Date()
      },
      {
        year: '2023',
        title: 'The Code Matrix',
        description: 'Began serious coding. Mastered fundamentals of programming logic.',
        color: '#00E5FF',
        createdAt: new Date()
      },
      {
        year: '2025',
        title: 'Web Architecture',
        description: 'Transitioned to Web Development, building modern React/Next.js apps.',
        color: '#EC4899',
        createdAt: new Date()
      },
      {
        year: '2026',
        title: 'Offensive Security',
        description: 'Entered Ethical Hacking & Bug Bounty. Founded Synapse Lab.',
        color: '#EC4899',
        createdAt: new Date()
      }
    ];

    const result = await collection.insertMany(events);
    console.log(`Successfully inserted ${result.insertedCount} timeline events`);

    const shortsCollection = db.collection('shorts');
    await shortsCollection.deleteMany({});
    const shorts = [
      {
        platform: 'YouTube',
        embedUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
        handle: '@SYNAPSE_LAB_IN',
        createdAt: new Date()
      },
      {
        platform: 'Instagram',
        embedUrl: 'https://www.instagram.com/p/C-X-wEFSq3T/embed',
        handle: '@dhanvanth_l.p',
        createdAt: new Date()
      }
    ];
    const shortsResult = await shortsCollection.insertMany(shorts);
    console.log(`Successfully inserted ${shortsResult.insertedCount} shorts`);

  } catch (err) {
    console.error("Error seeding DB:", err);
  } finally {
    await client.close();
  }
}

seed();
