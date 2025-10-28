import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';
import { checkRateLimit, resetRateLimit } from '@/lib/rate-limit';

// Thông tin đăng nhập
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = '$2b$10$ZFDj263Ek9geugrrUUN5H.n4UD5D2GT/BOlKibAH7Rh7WljxWM7tO'; // 123456

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    console.log('=================================');
    console.log('[Auth] Login attempt for username:', username, 'from IP:', clientIp);
    console.log('[Auth] Expected username:', ADMIN_USERNAME);
    console.log('[Auth] Expected hash:', ADMIN_PASSWORD_HASH);
    console.log('[Auth] Password length:', password?.length);
    console.log('=================================');

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

    console.log('[Auth] Rate limit check passed. Remaining attempts:', rateLimit.remaining);
    console.log('[Auth] Password received:', password ? '***' : 'empty');

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

    console.log('[Auth] Username valid:', isUsernameValid);
    console.log('[Auth] Password valid:', isPasswordValid);

    if (!isUsernameValid || !isPasswordValid) {
      console.log('[Auth] Login failed - invalid credentials. Remaining attempts:', rateLimit.remaining);
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
