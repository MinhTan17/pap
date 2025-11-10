// Script để kiểm tra environment variables trên production
// Bạn có thể tạo một API endpoint tạm để test

console.log('=== Environment Variables Check ===');
console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME || 'NOT SET');
console.log('ADMIN_PASSWORD_HASH:', process.env.ADMIN_PASSWORD_HASH || 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET (hidden)' : 'NOT SET');

// Test với password
const bcrypt = require('bcryptjs');
const password = 'AdminPAP@2025!177305';
const hash = process.env.ADMIN_PASSWORD_HASH;

if (hash) {
  const isMatch = bcrypt.compareSync(password, hash);
  console.log('\nPassword Test:');
  console.log('Password:', password);
  console.log('Match:', isMatch ? '✅ CORRECT' : '❌ WRONG');
} else {
  console.log('\n❌ ADMIN_PASSWORD_HASH not set!');
}
