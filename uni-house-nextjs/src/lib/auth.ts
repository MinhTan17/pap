import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE || '86400', 10);

export interface TokenPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export function generateToken(username: string): string {
  console.log('[Auth] Generating token for:', username);
  console.log('[Auth] Using JWT_SECRET length:', JWT_SECRET.length);
  console.log('[Auth] JWT_SECRET preview:', JWT_SECRET.substring(0, 20) + '...');
  
  const token = jwt.sign(
    { username },
    JWT_SECRET,
    { expiresIn: SESSION_MAX_AGE }
  );
  
  console.log('[Auth] Token generated, length:', token.length);
  console.log('[Auth] Token preview:', token.substring(0, 30) + '...');
  
  return token;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    console.log('[Auth] Verifying token...');
    console.log('[Auth] JWT_SECRET length:', JWT_SECRET.length);
    console.log('[Auth] JWT_SECRET preview:', JWT_SECRET.substring(0, 20) + '...');
    console.log('[Auth] Token preview:', token.substring(0, 30) + '...');
    
    const result = jwt.verify(token, JWT_SECRET) as TokenPayload;
    console.log('[Auth] Token verified successfully:', result);
    return result;
  } catch (error) {
    console.error('[Auth] Token verification failed!');
    console.error('[Auth] Error:', error instanceof Error ? error.message : error);
    console.error('[Auth] Error name:', error instanceof Error ? error.name : 'Unknown');
    
    // Try to decode without verification to see the payload
    try {
      const decoded = jwt.decode(token);
      console.error('[Auth] Decoded token (unverified):', decoded);
    } catch (e) {
      console.error('[Auth] Cannot decode token:', e);
    }
    
    return null;
  }
}
