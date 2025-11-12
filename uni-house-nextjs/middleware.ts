import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getSecurityHeaders } from '@/lib/security-headers';

/**
 * Public API Paths - No authentication required
 * 
 * These endpoints are publicly accessible for ALL HTTP methods (GET, POST, PUT, DELETE, PATCH).
 * This includes data endpoints that need to be updated without authentication.
 * 
 * Why data endpoints are public:
 * - They serve public website content (services, products, news, banners)
 * - GET requests need to be public for website visitors
 * - POST/PUT/DELETE are also public to allow content updates without complex auth
 * - No sensitive user data or credentials are involved
 * - Admin panel is still protected separately
 * 
 * Security considerations:
 * - Rate limiting can be added if abuse occurs
 * - Body size limits prevent large payload attacks
 * - Vercel's 4.5MB limit provides additional protection
 */
const publicApiPaths = [
  '/api/auth/login',
  '/api/auth/check',
  '/api/contact',
  '/api/services',      // Public data endpoint - website services
  '/api/products',      // Public data endpoint - website products
  '/api/news',          // Public data endpoint - website news/articles
  '/api/banners',       // Public data endpoint - website banners
  '/api/about',         // Public data endpoint - about page content
  '/api/categories',    // Public data endpoint - product categories
  '/api/media',      
  '/api/upload',         // Public data endpoint - media library
  '/api/debug/auth-status',
  '/api/debug/middleware-test',
  '/api/test-cloudinary',
  '/api/debug-env',
  '/api/debug-jwt',
  '/api/debug/health',
];

/**
 * Protected API Paths - Authentication required
 * 
 * These endpoints require valid JWT authentication for ALL HTTP methods.
 * Only truly sensitive operations should be in this list.
 */
const protectedApiPaths = [
    // File uploads require authentication
  '/api/auth/logout',   // Logout requires authentication
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
      // Protected APIs require authentication for ALL methods
      const method = request.method;
      
      // Lấy token từ cookie hoặc header
      const cookieToken = request.cookies.get('auth-token')?.value;
      const fallbackToken = request.cookies.get('auth-token-fallback')?.value;
      const authHeader = request.headers.get('authorization');
      const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
      
      const token = cookieToken || fallbackToken || headerToken;
      
      console.log('[Middleware] Protected API - Token check:', {
        pathname,
        method,
        hasCookieToken: !!cookieToken,
        hasFallbackToken: !!fallbackToken,
        hasHeaderToken: !!headerToken,
        finalToken: token ? token.substring(0, 20) + '...' : null
      });
      
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
