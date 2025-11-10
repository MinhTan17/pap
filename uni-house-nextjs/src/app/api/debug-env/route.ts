import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// TEMPORARY DEBUG ENDPOINT - DELETE AFTER TESTING
export async function GET() {
  const password = 'AdminPAP@2025!177305';
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const username = process.env.ADMIN_USERNAME;

  let isMatch = false;
  if (hash) {
    try {
      isMatch = bcrypt.compareSync(password, hash);
    } catch (error) {
      console.error('Bcrypt error:', error);
    }
  }

  return NextResponse.json({
    username: username || 'NOT SET',
    hashExists: !!hash,
    hashPreview: hash ? hash.substring(0, 20) + '...' : 'NOT SET',
    passwordTest: {
      password: password,
      match: isMatch,
    },
    env: process.env.NODE_ENV,
  });
}
