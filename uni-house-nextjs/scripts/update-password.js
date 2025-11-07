#!/usr/bin/env node

const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== Đổi Mật Khẩu Admin ===\n');

rl.question('Nhập mật khẩu mới: ', (password) => {
  if (!password || password.length < 6) {
    console.error('❌ Mật khẩu phải có ít nhất 6 ký tự!');
    rl.close();
    return;
  }

  console.log('\n🔐 Đang tạo hash...');
  
  const hash = bcrypt.hashSync(password, 10);
  
  console.log('\n✅ Hash đã được tạo:');
  console.log(hash);
  
  // Update login route
  const loginRoutePath = path.join(__dirname, '..', 'src', 'app', 'api', 'auth', 'login', 'route.ts');
  let content = fs.readFileSync(loginRoutePath, 'utf8');
  
  // Replace hash
  content = content.replace(
    /const ADMIN_PASSWORD_HASH = '[^']+';/,
    `const ADMIN_PASSWORD_HASH = '${hash}';`
  );
  
  // Remove plain text fallback
  content = content.replace(
    /\/\/ TEMPORARY:.*?\n.*?if \(!isPasswordValid && password === '[^']+'\) \{[\s\S]*?\}/m,
    ''
  );
  
  fs.writeFileSync(loginRoutePath, content, 'utf8');
  
  console.log('\n✅ Đã cập nhật login route');
  console.log('\n📝 Thông tin đăng nhập mới:');
  console.log('   Username: admin');
  console.log(`   Password: ${password}`);
  console.log('\n⚠️  Server sẽ tự động reload. Nếu không, restart: Ctrl+C và npm run dev\n');
  
  rl.close();
});
