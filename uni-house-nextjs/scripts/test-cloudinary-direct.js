#!/usr/bin/env node

/**
 * Test Cloudinary credentials trực tiếp
 * Chạy: node scripts/test-cloudinary-direct.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const cloudinary = require('cloudinary').v2;

console.log('🧪 Testing Cloudinary Credentials...\n');

// Kiểm tra env vars
console.log('📋 Environment Variables:');
console.log('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '❌ NOT SET');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ SET (' + process.env.CLOUDINARY_API_KEY.length + ' chars)' : '❌ NOT SET');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ SET (' + process.env.CLOUDINARY_API_SECRET.length + ' chars)' : '❌ NOT SET');
console.log('');

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Missing credentials!');
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('🔑 Testing API credentials...');

// Test 1: Ping API
cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('❌ Ping failed:', error.message);
    console.error('');
    console.error('Possible issues:');
    console.error('- Invalid API Key or Secret');
    console.error('- Cloud name is wrong');
    console.error('- Network connection issues');
    console.error('- Cloudinary account suspended');
    process.exit(1);
  } else {
    console.log('✅ Ping successful:', result);
    console.log('');
    
    // Test 2: Get usage stats
    console.log('📊 Checking account usage...');
    cloudinary.api.usage((error, result) => {
      if (error) {
        console.error('⚠️  Could not get usage stats:', error.message);
      } else {
        console.log('✅ Account usage:');
        console.log('   Plan:', result.plan || 'Free');
        console.log('   Credits used:', result.credits?.used || 0, '/', result.credits?.limit || 'unlimited');
        console.log('   Storage:', Math.round((result.storage?.used || 0) / 1024 / 1024), 'MB used');
        console.log('   Bandwidth:', Math.round((result.bandwidth?.used || 0) / 1024 / 1024), 'MB used');
        
        if (result.credits?.limit && result.credits?.used >= result.credits?.limit) {
          console.log('');
          console.log('⚠️  WARNING: You have reached your credit limit!');
          console.log('   This may prevent uploads from working.');
          console.log('   Consider upgrading your plan or waiting for reset.');
        }
      }
      console.log('');
      
      // Test 3: Try a simple upload
      console.log('📤 Testing upload...');
      
      // Create a tiny test image (1x1 pixel PNG)
      const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const testImageBuffer = Buffer.from(testImageBase64, 'base64');
      
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'uni-house/test',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error('❌ Upload failed:', error.message);
            console.error('');
            console.error('Error details:', error);
            console.error('');
            console.error('This is the EXACT error your Vercel app is getting!');
            console.error('');
            console.error('Common fixes:');
            console.error('1. Check API Key and Secret are correct');
            console.error('2. Check Cloudinary account is active');
            console.error('3. Check you have not exceeded quota');
            console.error('4. Try regenerating API credentials in Cloudinary Dashboard');
            process.exit(1);
          } else {
            console.log('✅ Upload successful!');
            console.log('   URL:', result.secure_url);
            console.log('   Public ID:', result.public_id);
            console.log('');
            
            // Clean up
            console.log('🗑️  Cleaning up test image...');
            cloudinary.uploader.destroy(result.public_id, (error) => {
              if (error) {
                console.log('⚠️  Could not delete test image:', error.message);
              } else {
                console.log('✅ Test image deleted');
              }
              console.log('');
              console.log('🎉 All tests passed!');
              console.log('');
              console.log('Your Cloudinary credentials are working correctly.');
              console.log('If upload still fails on Vercel, the issue is with Vercel environment variables.');
              console.log('');
              console.log('Next steps:');
              console.log('1. Double-check environment variables on Vercel');
              console.log('2. Make sure you selected "All Environments"');
              console.log('3. Redeploy your app');
              console.log('4. Check Vercel function logs for errors');
            });
          }
        }
      );
      
      uploadStream.end(testImageBuffer);
    });
  }
});
