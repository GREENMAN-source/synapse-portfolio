const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dhanvanthLP:dhanvanth@cluster0.vcpyknt.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
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
        console.log(`- Email: ${order.Email_Address || 'N/A'}`);
        console.log(`- Phone: ${order.Phone_Number || 'N/A'}`);
        console.log(`- Item: ${order.Target_Asset || 'N/A'}`);
        console.log(`- Price: ${order.Asset_Value || 'N/A'}`);
        console.log(`- Payment Method: ${order.Payment_Method || 'N/A'}`);
        console.log(`- FamApp Transaction ID: ${order.FamApp_Transaction_ID || 'N/A'}`);
        console.log(`- Address: ${order.Shipping_Address || 'N/A'}`);
      });
    }
  } catch (err) {
    console.error("Error retrieving orders:", err);
  } finally {
    await client.close();
  }
}

run();
