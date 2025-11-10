#!/usr/bin/env node

/**
 * Script to seed MongoDB with initial data from local files
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

// Sample data
const initialData = {
  products: [],
  services: [],
  banners: [
    {
      id: '1',
      image: '/images/banner1.jpg',
      title: 'Chào mừng đến với Phú An Phát',
      description: 'Giải pháp xây dựng toàn diện',
      link: '/san-pham'
    }
  ],
  about: [
    {
      id: 'about-company',
      section: 'company',
      title: 'Về Công Ty',
      content: 'Phú An Phát là công ty chuyên về xây dựng và cung cấp vật liệu xây dựng.',
      images: [],
      gridImages: [],
      updatedAt: new Date().toISOString()
    }
  ]
};

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    const db = client.db('unihouse');
    
    // Seed products
    const productsCount = await db.collection('products').countDocuments();
    if (productsCount === 0) {
      console.log('📦 Seeding products...');
      if (initialData.products.length > 0) {
        await db.collection('products').insertMany(initialData.products);
        console.log(`✅ Inserted ${initialData.products.length} products\n`);
      } else {
        console.log('ℹ️  No products to seed\n');
      }
    } else {
      console.log(`ℹ️  Products collection already has ${productsCount} documents\n`);
    }
    
    // Seed services
    const servicesCount = await db.collection('services').countDocuments();
    if (servicesCount === 0) {
      console.log('🛠️  Seeding services...');
      if (initialData.services.length > 0) {
        await db.collection('services').insertMany(initialData.services);
        console.log(`✅ Inserted ${initialData.services.length} services\n`);
      } else {
        console.log('ℹ️  No services to seed\n');
      }
    } else {
      console.log(`ℹ️  Services collection already has ${servicesCount} documents\n`);
    }
    
    // Seed banners
    const bannersCount = await db.collection('banners').countDocuments();
    if (bannersCount === 0) {
      console.log('🎨 Seeding banners...');
      await db.collection('banners').insertMany(initialData.banners);
      console.log(`✅ Inserted ${initialData.banners.length} banners\n`);
    } else {
      console.log(`ℹ️  Banners collection already has ${bannersCount} documents\n`);
    }
    
    // Seed about
    const aboutCount = await db.collection('about').countDocuments();
    if (aboutCount === 0) {
      console.log('📄 Seeding about...');
      await db.collection('about').insertMany(initialData.about);
      console.log(`✅ Inserted ${initialData.about.length} about sections\n`);
    } else {
      console.log(`ℹ️  About collection already has ${aboutCount} documents\n`);
    }
    
    console.log('✅ Database seeding completed!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase();
