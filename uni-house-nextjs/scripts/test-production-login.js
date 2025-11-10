/**
 * Test production login API
 * Usage: node scripts/test-production-login.js
 */

const PRODUCTION_URL = 'https://uni-house-nextjs.vercel.app';

async function testLogin() {
  console.log('🧪 Testing production login...\n');

  try {
    const response = await fetch(`${PRODUCTION_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'Admin2025!',
      }),
    });

    console.log('📊 Response Status:', response.status);
    console.log('📊 Response Headers:');
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    const data = await response.json();
    console.log('\n📦 Response Body:', JSON.stringify(data, null, 2));

    // Check for Set-Cookie header
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      console.log('\n🍪 Cookie Set:', setCookie);
    } else {
      console.log('\n⚠️  No cookie set in response');
    }

    if (data.success) {
      console.log('\n✅ Login successful!');
    } else {
      console.log('\n❌ Login failed:', data.message);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testLogin();
