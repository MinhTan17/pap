import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Đăng xuất thành công' });
    
    // Xóa cookie
    response.cookies.delete('auth-token');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi đăng xuất' },
      { status: 500 }
    );
  }
}
