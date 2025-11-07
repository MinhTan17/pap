import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getSecurityHeaders } from '@/lib/security-headers';

// Danh sách các route công khai (không cần đăng nhập)
const publicPaths = ['/admin/login'];

// Danh sách các route API công khai
const publicApiPaths = ['/api/auth/login', '/api/auth/check', '/api/contact'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Apply security headers to all responses
  const response = NextResponse.next();
  const securityHeaders = getSecurityHeaders();
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
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
  
  // Verify token if exists
  let isValidToken = false;
  if (token) {
    const payload = verifyToken(token);
    isValidToken = !!payload;
  }
  
  // Nếu là trang login và đã có token hợp lệ, chuyển hướng về trang admin
  if (pathname === '/admin/login' && isValidToken) {
    const redirectResponse = NextResponse.redirect(new URL('/admin', request.url));
    Object.entries(securityHeaders).forEach(([key, value]) => {
      redirectResponse.headers.set(key, value);
    });
    return redirectResponse;
  }

  // Nếu không phải là trang public và chưa đăng nhập hoặc token không hợp lệ, chuyển hướng về trang login
  if (!publicPaths.includes(pathname) && pathname.startsWith('/admin') && !isValidToken) {
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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
