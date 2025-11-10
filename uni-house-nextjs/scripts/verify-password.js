const bcrypt = require('bcryptjs');

// Password bạn muốn dùng
const password = 'AdminPAP@2025!177305';

// Hash từ .env.local
const hash1 = '$2b$10$0PVvMyt.wwM9ku1wtfJabOAFkFrPPhS6ZKQx8coDGyr38yLBAyVTa';

// Hash từ Vercel (session trước)
const hash2 = '$2b$10$f03vntnM9W7VLylMU2PHSehFZHsS3hGgx4f2Lj4rM3EM8bqd0c7mO';

console.log('Testing password:', password);
console.log('\n--- Hash 1 (from .env.local) ---');
console.log('Hash:', hash1);
console.log('Match:', bcrypt.compareSync(password, hash1));

console.log('\n--- Hash 2 (from Vercel) ---');
console.log('Hash:', hash2);
console.log('Match:', bcrypt.compareSync(password, hash2));

// Generate new hash
const newHash = bcrypt.hashSync(password, 10);
console.log('\n--- New Hash ---');
console.log('Hash:', newHash);
console.log('Match:', bcrypt.compareSync(password, newHash));
