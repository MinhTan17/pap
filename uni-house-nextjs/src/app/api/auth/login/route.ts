import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';
import { checkRateLimit, resetRateLimit } from '@/lib/rate-limit';

// Thông tin đăng nhập
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = '$2b$10$jF5gdSCqYg89ABr362oWRegzxWLFk2rvt2OXyH8WlCCz/2VukIo6K'; // AdminPAP@0703!2025

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth] Login attempt for username:', username);
    }

    // Check rate limit
    const rateLimit = checkRateLimit(clientIp, {
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    });

    if (!rateLimit.allowed) {
      const minutesLeft = Math.ceil((rateLimit.resetTime - Date.now()) / 60000);
      console.log('[Auth] Rate limit exceeded for IP:', clientIp);
      return NextResponse.json(
        {
          success: false,
          message: `Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau ${minutesLeft} phút.`
        },
        { status: 429 }
      );
    }



    // Kiểm tra thông tin đăng nhập
    const isUsernameValid = username === ADMIN_USERNAME;

    // Use synchronous compare to avoid potential async issues
    let isPasswordValid = false;
    try {
      isPasswordValid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
    } catch (bcryptError) {
      console.error('[Auth] Bcrypt error:', bcryptError);
      return NextResponse.json(
        { success: false, message: 'Lỗi xác thực mật khẩu' },
        { status: 500 }
      );
    }



    if (!isUsernameValid || !isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: `Tên đăng nhập hoặc mật khẩu không đúng. Còn ${rateLimit.remaining} lần thử.`
        },
        { status: 401 }
      );
    }

    // Reset rate limit on successful login
    resetRateLimit(clientIp);

    // Tạo JWT token
    const token = generateToken(username);

    console.log('[Auth] Login successful, setting secure cookie');

    // Tạo response và set cookie
    const response = NextResponse.json({
      success: true,
      user: { username }
    });

    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // Không set maxAge để cookie tự động xóa khi đóng browser
    });

    return response;

  } catch (error) {
    console.error('[Auth] Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại' },
      { status: 500 }
    );
  }
}
