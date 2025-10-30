const bcrypt = require('bcryptjs');

// Test với các giá trị từ .env.local
const password = 'adminpap';
const hash = '$2b$10$ZFDj263Ek9geugrrUUN5H.n4UD5D2GT/BOlKibAH7Rh7WljxWM7tO';

console.log('=================================');
console.log('  DEBUG LOGIN');
console.log('=================================\n');

console.log('Testing password:', password);
console.log('Against hash:', hash);
console.log('');

// Test với compareSync (như trong API)
try {
  const result = bcrypt.compareSync(password, hash);
  console.log('✅ compareSync result:', result);
} catch (error) {
  console.error('❌ compareSync error:', error);
}

// Test với compare async
bcrypt.compare(password, hash, (err, result) => {
  if (err) {
    console.error('❌ compare async error:', err);
    return;
  }
  console.log('✅ compare async result:', result);
});

// Test environment variables
console.log('\n--- Environment Variables ---');
console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME || 'NOT SET');
console.log('ADMIN_PASSWORD_HASH:', process.env.ADMIN_PASSWORD_HASH ? 'SET' : 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
