/**
 * Test authentication flow on production
 */

const BASE_URL = process.env.BASE_URL || 'https://www.phuanphat.com.vn';

async function testAuthFlow() {
  console.log('🧪 Testing authentication flow...\n');
  
  // Step 1: Login
  console.log('1️⃣ Testing login...');
  const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    }),
  });
  
  const loginData = await loginResponse.json();
  console.log('Login response:', loginData);
  
  if (!loginData.success || !loginData.token) {
    console.error('❌ Login failed!');
    return;
  }
  
  const token = loginData.token;
  console.log('✅ Login successful! Token:', token.substring(0, 20) + '...\n');
  
  // Step 2: Test authenticated request with Authorization header
  console.log('2️⃣ Testing authenticated POST request...');
  const testData = [
    {
      id: 1,
      title: 'Test Service',
      description: 'Test description',
      image: 'https://example.com/image.jpg',
    }
  ];
  
  const postResponse = await fetch(`${BASE_URL}/api/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(testData),
  });
  
  console.log('POST response status:', postResponse.status);
  const postData = await postResponse.json();
  console.log('POST response:', postData);
  
  if (postResponse.status === 401) {
    console.error('❌ Authentication failed! Token not accepted.');
  } else if (postResponse.status === 413) {
    console.error('❌ Request too large!');
  } else if (postResponse.ok) {
    console.log('✅ Authenticated request successful!');
  } else {
    console.error('❌ Request failed with status:', postResponse.status);
  }
}

testAuthFlow().catch(console.error);
