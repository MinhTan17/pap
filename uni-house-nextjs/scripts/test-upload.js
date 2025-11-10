#!/usr/bin/env node

/**
 * Script để test upload ảnh lên Cloudinary
 * Chạy: node scripts/test-upload.js
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testUpload() {
  console.log('🧪 Testing Cloudinary Upload...\n');

  // Kiểm tra environment variables
  console.log('📋 Checking environment variables:');
  console.log('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '❌ NOT SET');
  console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ SET' : '❌ NOT SET');
  console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ SET' : '❌ NOT SET');
  console.log('');

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Missing Cloudinary credentials in .env.local');
    console.log('\nAdd these to your .env.local file:');
    console.log('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dw2ahw6p9');
    console.log('CLOUDINARY_API_KEY=518911741122664');
    console.log('CLOUDINARY_API_SECRET=XXUoGElrwoBy6vh2X7Nr8XO82BM');
    process.exit(1);
  }

  // Test với Cloudinary API trực tiếp
  console.log('🚀 Testing direct upload to Cloudinary...');
  
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    // Tạo một ảnh test đơn giản (1x1 pixel PNG)
    const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const testImageBuffer = Buffer.from(testImageBase64, 'base64');

    console.log('📤 Uploading test image...');
    
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'uni-house/test',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(testImageBuffer);
    });

    console.log('✅ Upload successful!');
    console.log('📸 Image URL:', result.secure_url);
    console.log('🆔 Public ID:', result.public_id);
    console.log('📏 Size:', result.width, 'x', result.height);
    console.log('');

    // Xóa ảnh test
    console.log('🗑️  Cleaning up test image...');
    await cloudinary.uploader.destroy(result.public_id);
    console.log('✅ Test image deleted');
    console.log('');

    console.log('🎉 All tests passed! Cloudinary is configured correctly.');
    console.log('');
    console.log('Next steps:');
    console.log('1. Make sure these env vars are also set on Vercel');
    console.log('2. Redeploy your app on Vercel');
    console.log('3. Test upload on production');

  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    console.error('');
    console.error('Common issues:');
    console.error('- Invalid API credentials');
    console.error('- Network connection issues');
    console.error('- Cloudinary account issues');
    process.exit(1);
  }
}

// Load .env.local
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

testUpload();
