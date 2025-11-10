import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';
import { checkRateLimit, resetRateLimit } from '@/lib/rate-limit';


export async function POST(request: Request) {
  try {
    // Read from environment variables
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$10$qaCjkm1No/OzJ0o1qUBKsO1p.lcePPUb6nmeFoFuIm335QAdtLw.O';

    console.log('[Auth] Using password hash from environment');

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
      user: { username },
      token, // Send token in response body as fallback
    });

    // Try multiple cookie strategies
    // Strategy 1: httpOnly cookie (most secure)
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 86400,
    });

    // Strategy 2: Also set a non-httpOnly cookie as fallback
    response.cookies.set('auth-token-fallback', token, {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 86400,
    });

    console.log('[Auth] Cookies set successfully');

    return response;

  } catch (error) {
    console.error('[Auth] Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại' },
      { status: 500 }
    );
  }
}
