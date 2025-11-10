#!/usr/bin/env node

/**
 * Script để test upload ảnh trên Vercel production
 * Chạy: node scripts/test-vercel-upload.js https://your-domain.vercel.app
 */

const https = require('https');

const VERCEL_URL = process.argv[2];

if (!VERCEL_URL) {
  console.error('❌ Vui lòng cung cấp URL Vercel');
  console.log('Cách dùng: node scripts/test-vercel-upload.js https://your-domain.vercel.app');
  process.exit(1);
}

async function testVercelConfig() {
  console.log('🧪 Testing Vercel Upload Configuration...\n');
  console.log('🌐 Vercel URL:', VERCEL_URL);
  console.log('');

  // Test 1: Kiểm tra Cloudinary config
  console.log('📋 Test 1: Checking Cloudinary environment variables...');
  
  const testUrl = `${VERCEL_URL}/api/test-cloudinary`;
  console.log('   URL:', testUrl);
  
  try {
    const response = await fetch(testUrl);
    const data = await response.json();
    
    console.log('   Response:', JSON.stringify(data, null, 2));
    console.log('');
    
    if (data.cloudName === 'dw2ahw6p9') {
      console.log('   ✅ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: OK');
    } else {
      console.log('   ❌ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: WRONG or NOT SET');
      console.log('      Expected: dw2ahw6p9');
      console.log('      Got:', data.cloudName);
    }
    
    if (data.hasApiKey) {
      console.log('   ✅ CLOUDINARY_API_KEY: SET');
    } else {
      console.log('   ❌ CLOUDINARY_API_KEY: NOT SET');
    }
    
    if (data.hasApiSecret) {
      console.log('   ✅ CLOUDINARY_API_SECRET: SET');
    } else {
      console.log('   ❌ CLOUDINARY_API_SECRET: NOT SET');
    }
    
    console.log('');
    
    // Kiểm tra độ dài để đảm bảo không bị cắt
    if (data.apiKeyLength === 15) {
      console.log('   ✅ API Key length: OK (15 characters)');
    } else {
      console.log('   ⚠️  API Key length:', data.apiKeyLength, '(expected 15)');
    }
    
    if (data.apiSecretLength === 27) {
      console.log('   ✅ API Secret length: OK (27 characters)');
    } else {
      console.log('   ⚠️  API Secret length:', data.apiSecretLength, '(expected 27)');
    }
    
    console.log('');
    
    // Kết luận
    if (data.cloudName === 'dw2ahw6p9' && data.hasApiKey && data.hasApiSecret) {
      console.log('🎉 All environment variables are configured correctly!');
      console.log('');
      console.log('✅ Upload should work now. Try these steps:');
      console.log('   1. Go to:', VERCEL_URL + '/admin/login');
      console.log('   2. Login with your admin credentials');
      console.log('   3. Go to: Trang Giới thiệu or Dịch vụ');
      console.log('   4. Try uploading an image');
      console.log('');
      console.log('📸 If upload works, images will be stored at:');
      console.log('   https://res.cloudinary.com/dw2ahw6p9/image/upload/...');
    } else {
      console.log('❌ Configuration incomplete!');
      console.log('');
      console.log('🔧 Fix steps:');
      console.log('   1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables');
      console.log('   2. Make sure these 3 variables are set:');
      console.log('      - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = dw2ahw6p9');
      console.log('      - CLOUDINARY_API_KEY = 518911741122664');
      console.log('      - CLOUDINARY_API_SECRET = XXUoGElrwoBy6vh2X7Nr8XO82BM');
      console.log('   3. Make sure "All Environments" is selected');
      console.log('   4. Redeploy your project');
      console.log('   5. Run this test again');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('');
    console.log('Possible issues:');
    console.log('- Vercel URL is incorrect');
    console.log('- API route /api/test-cloudinary does not exist');
    console.log('- Network connection issues');
    console.log('');
    console.log('Make sure you have deployed the latest code with the test API route.');
    process.exit(1);
  }
}

// Polyfill fetch for Node.js < 18
if (typeof fetch === 'undefined') {
  global.fetch = function(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            json: () => Promise.resolve(JSON.parse(data))
          });
        });
      }).on('error', reject);
    });
  };
}

testVercelConfig();
