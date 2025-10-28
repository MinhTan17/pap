import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    console.log('[Auth Check] Token exists:', !!token);
    
    if (!token) {
      return NextResponse.json({
        authenticated: false,
        user: null
      });
    }
    
    // Verify JWT token
    const payload = verifyToken(token);
    
    if (!payload) {
      console.log('[Auth Check] Token verification failed');
      return NextResponse.json({
        authenticated: false,
        user: null
      });
    }
    
    console.log('[Auth Check] Token valid for user:', payload.username);
    
    // Tạo response
    const response = NextResponse.json({
      authenticated: true,
      user: { username: payload.username }
    });
    
    return response;
    
  } catch (error) {
    console.error('[Auth Check] Error:', error);
    const response = NextResponse.json(
      { authenticated: false, message: 'Authentication check failed' },
      { status: 500 }
    );
    
    return response;
  }
}
