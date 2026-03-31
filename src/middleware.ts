import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing admin routes (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for auth token in cookies or localStorage won't work in middleware
    // We'll rely on client-side auth checks for now
    // In production, you might want to check a session cookie here
    const token = request.cookies.get('tsw_auth_token')?.value;

    // For now, allow all requests and let client-side handle auth
    // This is because localStorage isn't accessible in middleware
    // Real-world apps should use HTTP-only cookies for JWT

    // If you want to enforce server-side auth check with cookies:
    // if (!token) {
    //   return NextResponse.redirect(new URL('/admin/login', request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
