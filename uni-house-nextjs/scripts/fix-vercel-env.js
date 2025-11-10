#!/usr/bin/env node

/**
 * Script to help diagnose and fix Vercel environment variable issues
 */

const bcrypt = require('bcryptjs');

console.log('=== Vercel Environment Variables Diagnostic ===\n');

// Expected values
const EXPECTED_USERNAME = 'admin';
const EXPECTED_PASSWORD = 'AdminPAP@2025!177305';
const EXPECTED_HASH = '$2b$10$qaCjkm1No/OzJ0o1qUBKsO1p.lcePPUb6nmeFoFuIm335QAdtLw.O';
const EXPECTED_JWT_SECRET = 'a8f5e2c9b4d7a1e6f3c8b5d2a9e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9a6e3f0c7b4d1a8e5f2c9b6d3a0e7f4c1b8d5a2e9f6c3b0d7a4e1f8c5b2d9';

console.log('✅ Expected Configuration:');
console.log('─────────────────────────────────────────────────────────');
console.log(`ADMIN_USERNAME: ${EXPECTED_USERNAME}`);
console.log(`ADMIN_PASSWORD: ${EXPECTED_PASSWORD}`);
console.log(`ADMIN_PASSWORD_HASH: ${EXPECTED_HASH}`);
console.log(`JWT_SECRET: ${EXPECTED_JWT_SECRET.substring(0, 20)}...`);
console.log('─────────────────────────────────────────────────────────\n');

// Verify hash
console.log('🔍 Verifying password hash...');
const isValid = bcrypt.compareSync(EXPECTED_PASSWORD, EXPECTED_HASH);
console.log(`Password matches hash: ${isValid ? '✅ YES' : '❌ NO'}\n`);

if (!isValid) {
  console.log('⚠️  Hash verification failed! Generating new hash...');
  const newHash = bcrypt.hashSync(EXPECTED_PASSWORD, 10);
  console.log(`New hash: ${newHash}\n`);
}

console.log('📋 COPY THESE VALUES TO VERCEL:');
console.log('─────────────────────────────────────────────────────────');
console.log('Go to: Vercel Dashboard → Your Project → Settings → Environment Variables\n');
console.log('Set these variables (make sure NO SPACES at start/end):\n');
console.log(`ADMIN_USERNAME`);
console.log(`${EXPECTED_USERNAME}\n`);
console.log(`ADMIN_PASSWORD_HASH`);
console.log(`${EXPECTED_HASH}\n`);
console.log(`JWT_SECRET`);
console.log(`${EXPECTED_JWT_SECRET}\n`);
console.log(`MONGODB_URI`);
console.log(`(your MongoDB connection string)\n`);
console.log('─────────────────────────────────────────────────────────\n');

console.log('⚠️  IMPORTANT STEPS:');
console.log('1. Copy each value EXACTLY as shown above');
console.log('2. Make sure there are NO spaces before or after the values');
console.log('3. Apply to Production environment');
console.log('4. Redeploy your application');
console.log('5. Test login again\n');

// Test with common issues
console.log('🧪 Testing common issues:\n');

// Test with spaces
const hashWithSpaces = ' ' + EXPECTED_HASH + ' ';
console.log('Testing hash with spaces:');
console.log(`"${hashWithSpaces}"`);
console.log(`Valid: ${bcrypt.compareSync(EXPECTED_PASSWORD, hashWithSpaces.trim()) ? '✅' : '❌'}\n`);

// Test username case sensitivity
console.log('Testing username variations:');
console.log(`"admin" === "admin": ✅`);
console.log(`"admin" === "Admin": ❌`);
console.log(`"admin" === " admin": ❌`);
console.log(`"admin" === "admin ": ❌\n`);

console.log('✅ Diagnostic complete!');
