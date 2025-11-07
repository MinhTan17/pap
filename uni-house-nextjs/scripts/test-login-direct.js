#!/usr/bin/env node

/**
 * Test login API directly
 */

const password = 'AdminPAP@2025!177305';

console.log('\n=== Testing Login API ===\n');
console.log('Username: admin');
console.log('Password:', password);
console.log('\nSending request to http://localhost:3000/api/auth/login...\n');

fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'admin',
    password: password,
  }),
})
  .then(res => {
    console.log('Status:', res.status, res.statusText);
    return res.json();
  })
  .then(data => {
    console.log('\nResponse:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ Login thành công!');
    } else {
      console.log('\n❌ Login thất bại:', data.message);
    }
  })
  .catch(err => {
    console.error('\n❌ Error:', err.message);
    console.log('\n⚠️  Đảm bảo server đang chạy: npm run dev');
  });
