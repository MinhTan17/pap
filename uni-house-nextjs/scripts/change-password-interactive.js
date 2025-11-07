#!/usr/bin/env node

/**
 * Interactive Password Change Script
 * Tạo hash cho mật khẩu mới và cập nhật .env.local
 * 
 * Usage:
 *   node scripts/change-password-interactive.js
 */

const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== Đổi Mật Khẩu Admin ===\n');

rl.question('Nhập mật khẩu mới (tối thiểu 8 ký tự): ', (password) => {
  if (!password || password.length < 8) {
    console.error('❌ Mật khẩu phải có ít nhất 8 ký tự!');
    rl.close();
    return;
  }

  // Validate password strength
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strength = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;
  
  if (strength < 3) {
    console.warn('⚠️  Cảnh báo: Mật khẩu yếu! Nên có ít nhất 3 trong 4: chữ hoa, chữ thường, số, ký tự đặc biệt');
    rl.question('Bạn có muốn tiếp tục? (y/n): ', (answer) => {
      if (answer.toLowerCase() !== 'y') {
        console.log('Đã hủy.');
        rl.close();
        return;
      }
      generateAndUpdate(password);
      rl.close();
    });
  } else {
    generateAndUpdate(password);
    rl.close();
  }
});

function generateAndUpdate(password) {
  console.log('\n🔐 Đang tạo hash...');
  
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  
  console.log('\n✅ Hash đã được tạo:');
  console.log(hash);
  
  // Update .env.local
  const envPath = path.join(__dirname, '..', '.env.local');
  
  try {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Replace password hash
    envContent = envContent.replace(
      /ADMIN_PASSWORD_HASH=.*/,
      `ADMIN_PASSWORD_HASH=${hash}`
    );
    
    // Update or add password comment
    if (envContent.includes('# Mật khẩu:')) {
      envContent = envContent.replace(
        /# Mật khẩu:.*/,
        `# Mật khẩu: ${password}`
      );
    } else {
      envContent = envContent.replace(
        /ADMIN_PASSWORD_HASH=.*/,
        `ADMIN_PASSWORD_HASH=${hash}\n# Mật khẩu: ${password}`
      );
    }
    
    fs.writeFileSync(envPath, envContent, 'utf8');
    
    console.log('\n✅ Đã cập nhật .env.local');
    console.log('\n📝 Thông tin đăng nhập mới:');
    console.log('   Username: admin');
    console.log(`   Password: ${password}`);
    console.log('\n⚠️  Lưu ý: Restart server để áp dụng thay đổi!');
    console.log('   Ctrl+C để dừng server, sau đó chạy lại: npm run dev\n');
    
  } catch (error) {
    console.error('\n❌ Lỗi khi cập nhật .env.local:', error.message);
    console.log('\n📋 Vui lòng copy hash này và cập nhật thủ công vào .env.local:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  }
}
