import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Thông tin đăng nhập mặc định
const ADMIN_USERNAME = 'admin';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    // Tạo response
    const response = NextResponse.json({
      authenticated: !!token,
      user: token ? { username: ADMIN_USERNAME } : null
    });
    
    // Thêm headers CORS nếu cần
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    
    return response;
    
  } catch (error) {
    console.error('Auth check error:', error);
    const response = NextResponse.json(
      { authenticated: false, message: 'Authentication check failed' },
      { status: 500 }
    );
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    
    return response;
  }
}
