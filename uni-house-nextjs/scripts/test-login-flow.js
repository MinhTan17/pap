const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Manually load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const ADMIN_USERNAME = envVars.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = envVars.ADMIN_PASSWORD_HASH;
const JWT_SECRET = envVars.JWT_SECRET;

console.log('=== Testing Login Flow ===\n');

// Test 1: Check environment variables
console.log('1. Environment Variables:');
console.log('   ADMIN_USERNAME:', ADMIN_USERNAME);
console.log('   ADMIN_PASSWORD_HASH:', ADMIN_PASSWORD_HASH ? 'Set ✓' : 'Missing ✗');
console.log('   JWT_SECRET:', JWT_SECRET ? `Set (${JWT_SECRET.length} chars) ✓` : 'Missing ✗');
console.log('');

// Test 2: Verify password
console.log('2. Password Verification:');
const testPassword = 'admin123';
try {
  const isValid = bcrypt.compareSync(testPassword, ADMIN_PASSWORD_HASH);
  console.log(`   Password "${testPassword}" is ${isValid ? 'VALID ✓' : 'INVALID ✗'}`);
} catch (error) {
  console.log('   Error:', error.message);
}
console.log('');

// Test 3: Generate and verify token
console.log('3. JWT Token Generation & Verification:');
try {
  const token = jwt.sign({ username: ADMIN_USERNAME }, JWT_SECRET, { expiresIn: 86400 });
  console.log('   Token generated ✓');
  console.log('   Token preview:', token.substring(0, 50) + '...');
  
  const verified = jwt.verify(token, JWT_SECRET);
  console.log('   Token verified ✓');
  console.log('   Payload:', verified);
} catch (error) {
  console.log('   Error:', error.message);
}
console.log('');

console.log('=== Test Complete ===');
