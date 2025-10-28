import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('[Auth] Logout request received');
    
    const response = NextResponse.json({ 
      success: true,
      message: 'Đăng xuất thành công' 
    });
    
    // Xóa cookie
    response.cookies.set({
      name: 'auth-token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0
    });
    
    console.log('[Auth] Logout successful');
    
    return response;
  } catch (error) {
    console.error('[Auth] Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra khi đăng xuất' },
      { status: 500 }
    );
  }
}
