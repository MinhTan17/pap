#!/usr/bin/env node

/**
 * Generate a strong JWT secret for production use
 * 
 * Usage:
 *   node scripts/generate-strong-secret.js
 */

const crypto = require('crypto');

// Generate a 64-byte (512-bit) random secret
const secret = crypto.randomBytes(64).toString('hex');

console.log('\n=== JWT Secret Generator ===\n');
console.log('Generated strong JWT secret:');
console.log(secret);
console.log('\nAdd this to your .env.local file:');
console.log(`JWT_SECRET=${secret}`);
console.log('\n⚠️  IMPORTANT: Keep this secret safe and never commit it to version control!\n');
