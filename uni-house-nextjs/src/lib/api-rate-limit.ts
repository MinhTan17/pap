// API Rate Limiting for public endpoints
interface RateLimitEntry {
  count: number;
  resetTime: number;
  blocked: boolean;
}

const apiRateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of apiRateLimitMap.entries()) {
    if (now > entry.resetTime) {
      apiRateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface ApiRateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs?: number;
}

export interface ApiRateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

export function checkApiRateLimit(
  identifier: string,
  config: ApiRateLimitConfig = {
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minute
    blockDurationMs: 5 * 60 * 1000, // 5 minutes
  }
): ApiRateLimitResult {
  const now = Date.now();
  const entry = apiRateLimitMap.get(identifier);

  // Check if blocked
  if (entry?.blocked && now < entry.resetTime) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  // Reset if window expired
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowMs;
    apiRateLimitMap.set(identifier, {
      count: 1,
      resetTime,
      blocked: false,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime,
    };
  }

  // Increment count
  entry.count++;

  // Block if exceeded
  if (entry.count > config.maxRequests) {
    entry.blocked = true;
    entry.resetTime = now + (config.blockDurationMs || config.windowMs);
    
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

export function resetApiRateLimit(identifier: string): void {
  apiRateLimitMap.delete(identifier);
}
