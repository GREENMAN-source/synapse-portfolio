import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://dhanvanthLP:dhanvanth@cluster0.vcpyknt.mongodb.net/?appName=Cluster0";

export async function onRequestPost(context) {
  const client = new MongoClient(uri, {
    maxPoolSize: 1,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  try {
    const request = context.request;
    const body = await request.json();
    
    // Connect to MongoDB
    await client.connect();
    const database = client.db('synapse_lab');
    const orders = database.collection('orders');
    
    // Insert order with timestamp
    const result = await orders.insertOne({
      ...body,
      timestamp: new Date().toISOString()
    });
    
    return new Response(JSON.stringify({ success: true, id: result.insertedId }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  } finally {
    // Ensure all sockets are closed and heartbeats stopped immediately
    await client.close(); 
  }
}

