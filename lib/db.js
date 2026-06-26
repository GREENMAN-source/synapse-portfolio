import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/synapselab';
let client = null;
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

export async function initDb() {
  // MongoDB automatically creates collections when inserting data
}

export async function getServices() {
  const dbClient = await clientPromise;
  const db = dbClient.db();
  const collection = db.collection('services');
  
  const services = await collection.find({}).toArray();
  
  if (services.length === 0) {
    // Return default services if database is empty
    return [
      { id: 1, title: "Web Development", description: "Building websites and web apps using HTML, CSS, JavaScript, and React. Great for small projects and startups on a budget.", price: "Affordable", delivery: "3-7 days" },
      { id: 2, title: "Security Testing", description: "Testing websites for basic security vulnerabilities. Good for understanding how websites can be hacked and how to protect them.", price: "Affordable", delivery: "2-4 days" },
      { id: 3, title: "Project Build", description: "End-to-end project development from concept to deployment. Startup MVPs, custom web apps.", price: "Custom", delivery: "2-4 weeks" }
    ];
  }
  
  return services.map(s => ({ ...s, id: s._id.toString() }));
}

export async function addContact(name, email, message) {
  const dbClient = await clientPromise;
  const db = dbClient.db();
  const collection = db.collection('contacts');
  
  const result = await collection.insertOne({
    name,
    email,
    message,
    created_at: new Date()
  });
  
  return { id: result.insertedId.toString() };
}

