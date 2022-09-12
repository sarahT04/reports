// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAdmin = token !== null && token.user.isAdmin;
  if (pathname.startsWith('/_next') || pathname === '/favicon.ico' || pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(new URL('/authentication', req.url));
  }
  if (pathname == '/authentication') {
    if (!token) return NextResponse.next();
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  if (pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}
