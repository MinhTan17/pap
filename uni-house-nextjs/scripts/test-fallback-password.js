#!/usr/bin/env node

const bcrypt = require('bcryptjs');

const fallbackHash = '$2b$10$jF5gdSCqYg89ABr362oWRegzxWLFk2rvt2OXyH8WlCCz/2VukIo6K';

console.log('\n=== Testing Fallback Hash ===\n');
console.log('Fallback hash:', fallbackHash);
console.log('\nTesting passwords:\n');

const passwords = ['123456', 'admin', 'Admin123'];

passwords.forEach(pwd => {
  const isValid = bcrypt.compareSync(pwd, fallbackHash);
  console.log(`  "${pwd}": ${isValid ? '✅ MATCH' : '❌ no match'}`);
});

console.log('\n');
