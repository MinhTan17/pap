const bcrypt = require('bcryptjs');

// Generate hash for password
// THAY ĐỔI MẬT KHẨU MỚI Ở ĐÂY:
const password = '123456'; // <-- Thay đổi mật khẩu mới tại đây
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nCopy this hash to your login route.ts file');
});
