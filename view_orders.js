const { MongoClient } = require('mongodb');

// Direct connection string to bypass SRV DNS lookups
const uri = "mongodb://dhanvanthLP:dhanvanth@ac-mdreumi-shard-00-00.vcpyknt.mongodb.net:27017,ac-mdreumi-shard-00-01.vcpyknt.mongodb.net:27017,ac-mdreumi-shard-00-02.vcpyknt.mongodb.net:27017/synapse_lab?ssl=true&authSource=admin";
const client = new MongoClient(uri);

async function run() {
  try {
    console.log("Connecting to MongoDB via direct hosts...");
    await client.connect();
    console.log("Connected successfully!");
    const database = client.db('synapse_lab');
    const orders = database.collection('orders');
    
    console.log("=== CURRENT PORTFOLIO ORDERS ===");
    const allOrders = await orders.find({}).sort({ timestamp: -1 }).toArray();
    
    if (allOrders.length === 0) {
      console.log("No orders found in the database.");
    } else {
      allOrders.forEach((order, index) => {
        console.log(`\nOrder #${index + 1}:`);
        console.log(`- Date: ${order.timestamp || order.createdAt || 'N/A'}`);
        console.log(`- Customer: ${order.Full_Name || 'N/A'}`);
        console.log(`- Item: ${order.Target_Asset || 'N/A'}`);
        console.log(`- Price: ${order.Asset_Value || 'N/A'}`);
      });
    }
  } catch (err) {
    console.error("Error retrieving orders:", err);
  } finally {
    await client.close();
  }
}

run();
