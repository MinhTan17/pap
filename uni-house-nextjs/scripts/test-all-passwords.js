#!/usr/bin/env node

const passwords = [
  '123456',
  'Admin2025',
  'AdminPAP@2025!177305',
];

console.log('\n=== Testing All Passwords ===\n');

async function testPassword(password) {
  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password }),
    });
    
    const data = await res.json();
    return { password, status: res.status, success: data.success };
  } catch (err) {
    return { password, error: err.message };
  }
}

(async () => {
  for (const pwd of passwords) {
    const result = await testPassword(pwd);
    if (result.error) {
      console.log(`❌ "${pwd}": Error - ${result.error}`);
    } else if (result.success) {
      console.log(`✅ "${pwd}": SUCCESS!`);
    } else {
      console.log(`❌ "${pwd}": Failed (${result.status})`);
    }
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n');
})();
