const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb+srv://dhanvanthLP:dhanvanthLP@cluster0.vcpyknt.mongodb.net/synapselab?appName=Cluster0';

const products = [
  {
    id: 'PRD-001',
    name: 'Custom Web Application',
    desc: 'End-to-end fullstack development. Built with Next.js, tailored for absolute performance and seamless UX.',
    price: '$3000',
    color: '#00E5FF',
    icon_name: 'Code',
    glow: 'rgba(0,229,255,0.4)',
  },
  {
    id: 'PRD-002',
    name: 'Security VAPT Testing',
    desc: 'Deep vulnerability assessment and penetration testing for your infrastructure. Zero compromises.',
    price: '$2500',
    color: '#EC4899',
    icon_name: 'Shield',
    glow: 'rgba(236,72,153,0.4)',
  },
  {
    id: 'PRD-003',
    name: 'LifeFlow IV Monitor',
    desc: 'Fully assembled IoT medical monitoring system. Alerts nurses automatically before IV bags empty.',
    price: '$1500',
    color: '#10B981',
    icon_name: 'Zap',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    id: 'PRD-004',
    name: 'Enterprise Dashboard',
    desc: 'Data-rich, cinematic admin dashboards featuring real-time telemetry and highly secure authentication.',
    price: '$4500',
    color: '#F7DF1E',
    icon_name: 'Server',
    glow: 'rgba(247,223,30,0.4)',
  },
  {
    id: 'PRD-005',
    name: 'Smart Home Hub',
    desc: 'Automated home control system. Built, configured, and shipped directly to you for instant deployment.',
    price: '$3500',
    color: '#8B5CF6',
    icon_name: 'Globe',
    glow: 'rgba(139,92,246,0.4)',
  },
  {
    id: 'PRD-006',
    name: 'Facial Recognition Lock',
    desc: 'Bare-metal hardware access control. High-speed facial mapping integrated with electronic strike locks.',
    price: '$2200',
    color: '#EF4444',
    icon_name: 'Lock',
    glow: 'rgba(239,68,68,0.4)',
  },
  {
    id: 'PRD-007',
    name: 'Automated Plant Care',
    desc: 'Self-regulating irrigation hardware with moisture sensing arrays and integrated LCD display matrix.',
    price: '$800',
    color: '#34D399',
    icon_name: 'Cpu',
    glow: 'rgba(52,211,153,0.4)',
  },
  {
    id: 'PRD-008',
    name: 'E-Commerce System',
    desc: 'High-conversion online storefronts with gamified UX, integrated payments, and secure routing.',
    price: '$3800',
    color: '#3B82F6',
    icon_name: 'ShoppingBag',
    glow: 'rgba(59,130,246,0.4)',
  },
  {
    id: 'PRD-009',
    name: 'ESP32 Sensor Array',
    desc: 'Custom-soldered bare-metal telemetry arrays for capturing environmental data at extreme accuracy.',
    price: '$1200',
    color: '#F59E0B',
    icon_name: 'Zap',
    glow: 'rgba(245,158,11,0.4)',
  },
  {
    id: 'PRD-010',
    name: 'Neo-API Architecture',
    desc: 'Scalable backend API services engineered for extreme load balancing and instantaneous response times.',
    price: '$2800',
    color: '#6366F1',
    icon_name: 'Workflow',
    glow: 'rgba(99,102,241,0.4)',
  }
];

async function pushToDB() {
  console.log('Connecting to database...');
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected successfully!');
    const db = client.db();
    
    const collection = db.collection('products');
    
    console.log('Clearing old products...');
    await collection.deleteMany({});
    
    console.log(`Inserting ${products.length} products into the database...`);
    const result = await collection.insertMany(products);
    
    console.log(`Success! Inserted ${result.insertedCount} products into the DB.`);
  } catch (err) {
    console.error('Error connecting to database:', err);
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}

pushToDB();
