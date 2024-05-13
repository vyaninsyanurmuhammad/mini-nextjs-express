import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/jwt';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/[id]/checkout'];
const authRoutes = ['/auth'];
const publicRoutes = ['', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const session = await getSession();

  // 4. Redirect to /login if the user is not authenticated
  if (isAuthRoute && session?.id) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  // if (
  //   isPublicRoute &&
  //   session?.id &&
  //   !req.nextUrl.pathname.startsWith('/dashboard')
  // ) {
  //   return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  // }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
