import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Danh sách các route công khai (không cần đăng nhập)
const publicPaths = ['/admin/login'];

// Danh sách các route API công khai
const publicApiPaths = ['/api/auth/login', '/api/auth/check'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Cho phép truy cập các file tĩnh
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Cho phép truy cập các API công khai
  if (pathname.startsWith('/api/')) {
    const isPublicApi = publicApiPaths.some(apiPath => 
      pathname.startsWith(apiPath)
    );
    
    if (isPublicApi) {
      return NextResponse.next();
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
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Nếu không phải là trang public và chưa đăng nhập hoặc token không hợp lệ, chuyển hướng về trang login
  if (!publicPaths.includes(pathname) && pathname.startsWith('/admin') && !isValidToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
