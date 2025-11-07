// Security Event Logger
export enum SecurityEventType {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGIN_BLOCKED = 'LOGIN_BLOCKED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  CSRF_VIOLATION = 'CSRF_VIOLATION',
  XSS_ATTEMPT = 'XSS_ATTEMPT',
}

export interface SecurityEvent {
  type: SecurityEventType;
  timestamp: Date;
  ip: string;
  userAgent?: string;
  username?: string;
  details?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// In-memory log (use database or external logging service in production)
const securityLogs: SecurityEvent[] = [];
const MAX_LOGS = 1000;

export function logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
  const logEntry: SecurityEvent = {
    ...event,
    timestamp: new Date(),
  };

  securityLogs.unshift(logEntry);

  // Keep only last MAX_LOGS entries
  if (securityLogs.length > MAX_LOGS) {
    securityLogs.pop();
  }

  // Console log for critical events
  if (event.severity === 'critical' || event.severity === 'high') {
    console.warn('[SECURITY]', {
      type: event.type,
      ip: event.ip,
      username: event.username,
      details: event.details,
    });
  }
}

export function getSecurityLogs(limit: number = 100): SecurityEvent[] {
  return securityLogs.slice(0, limit);
}

export function getSecurityLogsByType(type: SecurityEventType, limit: number = 50): SecurityEvent[] {
  return securityLogs.filter(log => log.type === type).slice(0, limit);
}

export function getSecurityLogsByIp(ip: string, limit: number = 50): SecurityEvent[] {
  return securityLogs.filter(log => log.ip === ip).slice(0, limit);
}

export function clearSecurityLogs(): void {
  securityLogs.length = 0;
}
