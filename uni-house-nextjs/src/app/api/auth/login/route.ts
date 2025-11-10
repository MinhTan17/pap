import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';
import { checkRateLimit, resetRateLimit } from '@/lib/rate-limit';


export async function POST(request: Request) {
  try {
    // Read from environment variables inside the function
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$10$CUb2rbnCOGMPDmEx1nC50eDkk5O86J9qf8qnSZLufLWTocPWCq5R.';



    const { username, password } = await request.json();

    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    console.log('[Auth] Login attempt:', { username, clientIp });

    // Check rate limit
    const rateLimit = checkRateLimit(clientIp, {
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      const minutesLeft = Math.ceil((rateLimit.resetTime - Date.now()) / 60000);
      return NextResponse.json(
        {
          success: false,
          message: `Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau ${minutesLeft} phút.`
        },
        { status: 429 }
      );
    }

    // Kiểm tra username
    const isUsernameValid = username === ADMIN_USERNAME;
    console.log('[Auth] Username check:', { provided: username, expected: ADMIN_USERNAME, valid: isUsernameValid });

    // Kiểm tra password với bcrypt
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
      console.log('[Auth] Login failed:', { usernameValid: isUsernameValid, passwordValid: isPasswordValid });
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

    console.log('[Auth] Login successful');

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
