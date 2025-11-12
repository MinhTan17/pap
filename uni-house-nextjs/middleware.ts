import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getSecurityHeaders } from '@/lib/security-headers';

// Danh sách các route API công khai (không cần authentication)
const publicApiPaths = [
  '/api/auth/login',
  '/api/auth/check',
  '/api/contact',
  '/api/debug/auth-status',
  '/api/test-cloudinary',
  '/api/debug-env',
  '/api/debug-jwt',
  '/api/debug/health',
];

// Danh sách các route API cần authentication
const protectedApiPaths = [
  '/api/upload',
  '/api/about',
  '/api/services',
  '/api/products',
  '/api/news',
  '/api/banners',
  '/api/categories',
  '/api/media',
  '/api/auth/logout',
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

  // Xử lý API routes
  if (pathname.startsWith('/api/')) {
    // Cho phép truy cập các API công khai
    const isPublicApi = publicApiPaths.some(apiPath => 
      pathname.startsWith(apiPath)
    );
    
    if (isPublicApi) {
      console.log('[Middleware] Allowing public API:', pathname);
      return response;
    }
    
    // Kiểm tra authentication cho protected APIs
    const isProtectedApi = protectedApiPaths.some(apiPath => 
      pathname.startsWith(apiPath)
    );
    
    if (isProtectedApi) {
      // Chỉ yêu cầu authentication cho POST, PUT, DELETE, PATCH
      // GET requests không cần authentication (để đọc data)
      const method = request.method;
      const requiresAuth = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
      
      if (!requiresAuth) {
        console.log('[Middleware] Allowing GET request for protected API:', pathname);
        return response;
      }
      
      // Lấy token từ cookie hoặc header
      const cookieToken = request.cookies.get('auth-token')?.value;
      const fallbackToken = request.cookies.get('auth-token-fallback')?.value;
      const headerToken = request.headers.get('authorization')?.replace('Bearer ', '');
      
      const token = cookieToken || fallbackToken || headerToken;
      
      if (!token) {
        console.log('[Middleware] No token for protected API:', pathname, method);
        return NextResponse.json(
          { success: false, message: 'Unauthorized - No token provided' },
          { status: 401 }
        );
      }
      
      const payload = verifyToken(token);
      if (!payload) {
        console.log('[Middleware] Invalid token for protected API:', pathname);
        return NextResponse.json(
          { success: false, message: 'Unauthorized - Invalid token' },
          { status: 401 }
        );
      }
      
      console.log('[Middleware] Token valid for protected API:', pathname, method);
      return response;
    }
    
    // Các API khác (không public, không protected) - cho phép truy cập
    console.log('[Middleware] Allowing other API:', pathname);
    return response;
  }

  // Xử lý admin pages (không phải API)
  if (pathname.startsWith('/admin')) {
    // Lấy token từ cookie hoặc header
    const cookieToken = request.cookies.get('auth-token')?.value;
    const fallbackToken = request.cookies.get('auth-token-fallback')?.value;
    const headerToken = request.headers.get('authorization')?.replace('Bearer ', '');
    
    const token = cookieToken || fallbackToken || headerToken;
    
    console.log('[Middleware] Admin page token check:', {
      pathname,
      hasCookieToken: !!cookieToken,
      hasFallbackToken: !!fallbackToken,
      hasHeaderToken: !!headerToken,
      finalToken: !!token,
    });
    
    // Verify token if exists
    let isValidToken = false;
    if (token) {
      const payload = verifyToken(token);
      isValidToken = !!payload;
      console.log('[Middleware] Admin page token verification:', { 
        pathname, 
        isValidToken 
      });
    }
    
    // Nếu chưa đăng nhập, chuyển hướng về trang login
    // NHƯNG không redirect nếu đang ở trang /admin (dashboard) vì ClientAuthCheck sẽ xử lý
    if (!isValidToken && pathname !== '/admin') {
      console.log('[Middleware] Redirecting to login:', pathname);
      const redirectResponse = NextResponse.redirect(new URL('/admin/login', request.url));
      Object.entries(securityHeaders).forEach(([key, value]) => {
        redirectResponse.headers.set(key, value);
      });
      return redirectResponse;
    }
  }

  return response;
}

// Enable middleware ONLY for protected APIs, NOT for admin pages
// Admin pages will be protected by ClientAuthCheck component instead
export const config = {
  matcher: [
    '/api/:path*',
  ],
};
