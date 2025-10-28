import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// Thông tin đăng nhập mặc định
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = '$2a$10$XFDv5J5H5UzQ7zXv5q5Q0Oc5Z5X5Z5X5Z5X5Z5X5Z5X5Z5X5Z5X5Z5'; // 123456

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // Kiểm tra thông tin đăng nhập
    const isUsernameValid = username === ADMIN_USERNAME;
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isUsernameValid || !isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    // Tạo token đơn giản
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    
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
      maxAge: 60 * 60 * 24 // 1 ngày
    });
    
    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại' },
      { status: 500 }
    );
  }
}
