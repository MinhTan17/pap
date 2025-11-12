import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries());
  const cookies = Object.fromEntries(
    Array.from(request.cookies.getAll()).map(c => [c.name, c.value])
  );
  
  return NextResponse.json({
    message: 'Middleware test endpoint',
    headers: {
      authorization: headers.authorization,
      'content-type': headers['content-type'],
      'content-length': headers['content-length'],
    },
    cookies,
    method: request.method,
  });
}

export async function GET(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries());
  const cookies = Object.fromEntries(
    Array.from(request.cookies.getAll()).map(c => [c.name, c.value])
  );
  
  return NextResponse.json({
    message: 'Middleware test endpoint (GET)',
    headers: {
      authorization: headers.authorization,
      'content-type': headers['content-type'],
    },
    cookies,
    method: request.method,
  });
}
