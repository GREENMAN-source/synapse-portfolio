import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://dhanvanthLP:dhanvanth@cluster0.vcpyknt.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

export async function onRequestPost(context) {
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
    // Keep connection alive for Edge performance or close it
    // await client.close(); 
  }
}
