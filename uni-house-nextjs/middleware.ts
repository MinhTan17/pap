import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
  
  // Nếu là trang login và đã có token, chuyển hướng về trang admin
  if (pathname === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Nếu không phải là trang public và chưa đăng nhập, chuyển hướng về trang login
  if (!publicPaths.includes(pathname) && pathname.startsWith('/admin') && !token) {
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
