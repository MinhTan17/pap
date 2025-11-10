/**
 * Test if JWT_SECRET mismatch is causing the issue
 * This simulates what happens when token is created with one secret
 * but verified with another
 */

const jwt = require('jsonwebtoken');

// Your local JWT_SECRET from .env.local
const LOCAL_SECRET = 'a8f5e2c9b4d7a1e6f3c8b5d2a9e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9a6e3f0c7b4d1a8e5f2c9b6d3a0e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9';

// Fallback secret (what Vercel might be using if JWT_SECRET is not set)
const FALLBACK_SECRET = 'fallback-secret-key';

console.log('🧪 Testing JWT Secret Mismatch\n');

// Create token with local secret (what happens during login)
const token = jwt.sign({ username: 'admin' }, LOCAL_SECRET, { expiresIn: 86400 });
console.log('✅ Token created with LOCAL_SECRET');
console.log('Token:', token.substring(0, 50) + '...\n');

// Try to verify with local secret (should work)
try {
  const payload1 = jwt.verify(token, LOCAL_SECRET);
  console.log('✅ Verification with LOCAL_SECRET: SUCCESS');
  console.log('Payload:', payload1, '\n');
} catch (error) {
  console.log('❌ Verification with LOCAL_SECRET: FAILED');
  console.log('Error:', error.message, '\n');
}

// Try to verify with fallback secret (will fail if Vercel uses fallback)
try {
  const payload2 = jwt.verify(token, FALLBACK_SECRET);
  console.log('✅ Verification with FALLBACK_SECRET: SUCCESS');
  console.log('Payload:', payload2, '\n');
} catch (error) {
  console.log('❌ Verification with FALLBACK_SECRET: FAILED');
  console.log('Error:', error.message, '\n');
  console.log('⚠️  THIS IS THE PROBLEM!');
  console.log('⚠️  Token was created with LOCAL_SECRET but Vercel is trying to verify with FALLBACK_SECRET');
  console.log('\n📝 SOLUTION: Add JWT_SECRET to Vercel environment variables');
}
