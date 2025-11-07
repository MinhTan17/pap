#!/usr/bin/env node

/**
 * Test password against hash
 */

const bcrypt = require('bcryptjs');

// Lấy từ .env.local
const password = 'AdminPAP@2025!177305';
const hash = '$2b$10$n8IBvHm0aFP3s/ARIeHl2.cHl8mmVofsxcMEqcAFna93L3v66EIVa';

console.log('\n=== Test Password ===\n');
console.log('Password:', password);
console.log('Hash:', hash);
console.log('\nTesting...');

const isValid = bcrypt.compareSync(password, hash);

console.log('\nResult:', isValid ? '✅ MATCH!' : '❌ NO MATCH');

if (!isValid) {
  console.log('\n⚠️  Hash không khớp với password!');
  console.log('Đang tạo hash mới...\n');
  
  const newHash = bcrypt.hashSync(password, 10);
  console.log('Hash mới:');
  console.log(newHash);
  console.log('\nCopy hash này vào .env.local:');
  console.log(`ADMIN_PASSWORD_HASH=${newHash}`);
}

console.log('\n');
