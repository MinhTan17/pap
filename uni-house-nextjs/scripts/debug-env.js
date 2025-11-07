#!/usr/bin/env node

/**
 * Debug environment variables và password hash
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Load .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

envLines.forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    process.env[key] = value;
  }
});

console.log('\n=== Debug Environment Variables ===\n');

console.log('1. Environment Variables:');
console.log('   ADMIN_USERNAME:', process.env.ADMIN_USERNAME || '(not set)');
console.log('   ADMIN_PASSWORD_HASH:', process.env.ADMIN_PASSWORD_HASH ? 'Set ✓' : '(not set)');
console.log('   Full hash:', process.env.ADMIN_PASSWORD_HASH);

console.log('\n2. Testing passwords:');

const testPasswords = [
  '123456',
  'AdminPAP@2025!177305',
  'admin',
];

const hash = process.env.ADMIN_PASSWORD_HASH;

if (!hash) {
  console.error('❌ ADMIN_PASSWORD_HASH not found in environment!');
  process.exit(1);
}

testPasswords.forEach(pwd => {
  const isValid = bcrypt.compareSync(pwd, hash);
  console.log(`   "${pwd}": ${isValid ? '✅ MATCH' : '❌ no match'}`);
});

console.log('\n3. Recommendation:');
console.log('   Nếu không có password nào match, chạy:');
console.log('   node scripts/generate-hash.js');
console.log('   và copy hash mới vào .env.local\n');
