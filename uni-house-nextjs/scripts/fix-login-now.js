#!/usr/bin/env node

const bcrypt = require('bcryptjs');

console.log('\n=== Generating New Hash for 123456 ===\n');

const password = '123456';
const hash = bcrypt.hashSync(password, 10);

console.log('Password:', password);
console.log('New Hash:', hash);

// Test it
const isValid = bcrypt.compareSync(password, hash);
console.log('Test:', isValid ? '✅ Valid' : '❌ Invalid');

console.log('\n📝 Update login route with this hash:');
console.log(`const ADMIN_PASSWORD_HASH = '${hash}';`);
console.log('\n');
