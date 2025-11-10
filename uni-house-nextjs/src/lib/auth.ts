import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE || '86400', 10);

export interface TokenPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export function generateToken(username: string): string {
  return jwt.sign(
    { username },
    JWT_SECRET,
    { expiresIn: SESSION_MAX_AGE }
  );
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    console.log('[Auth] Verifying token with JWT_SECRET length:', JWT_SECRET.length);
    const result = jwt.verify(token, JWT_SECRET) as TokenPayload;
    console.log('[Auth] Token verified successfully:', result);
    return result;
  } catch (error) {
    console.error('[Auth] Token verification failed:', error);
    console.error('[Auth] JWT_SECRET preview:', JWT_SECRET.substring(0, 10) + '...');
    return null;
  }
}
