import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getSecurityHeaders } from '@/lib/security-headers';

// Danh sách các route API công khai
const publicApiPaths = [
  '/api/auth/login',
  '/api/auth/check',
  '/api/contact',
  '/api/debug/auth-status',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Apply security headers to all responses
  const response = NextResponse.next();
  const securityHeaders = getSecurityHeaders();
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Cho phép truy cập trang login và debug mà không cần check token
  if (pathname === '/admin/login' || pathname === '/debug-auth') {
    console.log('[Middleware] Allowing access to public page:', pathname);
    return response;
  }

  // Cho phép truy cập các file tĩnh
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return response;
  }

  // Cho phép truy cập các API công khai
  if (pathname.startsWith('/api/')) {
    const isPublicApi = publicApiPaths.some(apiPath => 
      pathname.startsWith(apiPath)
    );
    
    if (isPublicApi) {
      return response;
    }
  }

  // Lấy token từ cookie
  const token = request.cookies.get('auth-token')?.value;
  
  console.log('[Middleware] Cookie check:', {
    pathname,
    hasToken: !!token,
    allCookies: Array.from(request.cookies.getAll()).map(c => c.name),
  });
  
  // Verify token if exists
  let isValidToken = false;
  if (token) {
    console.log('[Middleware] Token found, verifying...', { 
      pathname, 
      tokenPreview: token.substring(0, 20) + '...' 
    });
    const payload = verifyToken(token);
    isValidToken = !!payload;
    console.log('[Middleware] Token verification result:', { 
      pathname, 
      isValidToken, 
      payload 
    });
  } else {
    console.log('[Middleware] No token found for path:', pathname);
  }
  
  // Nếu truy cập trang admin mà chưa đăng nhập, chuyển hướng về trang login
  if (pathname.startsWith('/admin') && !isValidToken) {
    console.log('[Middleware] Redirecting to login (not authenticated):', { pathname, isValidToken });
    const redirectResponse = NextResponse.redirect(new URL('/admin/login', request.url));
    Object.entries(securityHeaders).forEach(([key, value]) => {
      redirectResponse.headers.set(key, value);
    });
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/debug-auth',
  ],
};
