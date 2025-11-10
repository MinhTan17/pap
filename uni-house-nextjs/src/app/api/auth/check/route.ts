import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // Try to get token from cookie first, then from Authorization header
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('auth-token')?.value;
    const authHeader = request.headers.get('authorization');
    const headerToken = authHeader?.replace('Bearer ', '');
    
    const token = cookieToken || headerToken;
    
    console.log('[Auth Check] Token check:', {
      hasCookieToken: !!cookieToken,
      hasHeaderToken: !!headerToken,
      finalToken: !!token,
    });
    
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
