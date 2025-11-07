#!/usr/bin/env node

const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const simplePassword = 'Admin2025';
console.log('\n=== Setting Simple Password ===\n');
console.log('New password:', simplePassword);

const hash = bcrypt.hashSync(simplePassword, 10);
console.log('Hash:', hash);

// Update .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let envContent = fs.readFileSync(envPath, 'utf8');

envContent = envContent.replace(
  /ADMIN_PASSWORD_HASH=.*/,
  `ADMIN_PASSWORD_HASH=${hash}`
);

envContent = envContent.replace(
  /# Mật khẩu:.*/,
  `# Mật khẩu: ${simplePassword}`
);

fs.writeFileSync(envPath, envContent, 'utf8');

console.log('\n✅ Updated .env.local');
console.log('\n📝 Login credentials:');
console.log('   Username: admin');
console.log(`   Password: ${simplePassword}`);
console.log('\n⚠️  MUST restart server: Ctrl+C then npm run dev\n');
