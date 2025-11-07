// CSRF Protection
import { randomBytes } from 'crypto';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

interface CsrfToken {
  token: string;
  expiresAt: number;
}

// In-memory store (use Redis in production)
const csrfTokens = new Map<string, CsrfToken>();

// Clean up expired tokens every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of csrfTokens.entries()) {
    if (now > value.expiresAt) {
      csrfTokens.delete(key);
    }
  }
}, 10 * 60 * 1000);

export function generateCsrfToken(sessionId: string): string {
  const token = randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
  const expiresAt = Date.now() + CSRF_TOKEN_EXPIRY;
  
  csrfTokens.set(sessionId, { token, expiresAt });
  
  return token;
}

export function verifyCsrfToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId);
  
  if (!stored) {
    return false;
  }
  
  if (Date.now() > stored.expiresAt) {
    csrfTokens.delete(sessionId);
    return false;
  }
  
  return stored.token === token;
}

export function deleteCsrfToken(sessionId: string): void {
  csrfTokens.delete(sessionId);
}
