'dotenv/config'

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";	

const privateRoutes = [
  { path: '/private' },
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPrivateRoute = privateRoutes.some(route => route.path === path || path.startsWith('/user'))

  const authToken = request.cookies.get('token')?.value;

  if (isPrivateRoute && !authToken) {
      return NextResponse.redirect(new URL('/', request.url))
  }

  if(!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.')
  }

  if (isPrivateRoute && authToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const { payload } = await jwtVerify(authToken, secret)

      const { exp } = payload;    
      const currentTime = Date.now() / 1000;

      // Se o token expirou, RALA!
      if (exp && exp < currentTime) {
        return NextResponse.redirect(new URL('/', request.url))
      }

    } catch (error) {
      console.error('Invalid token.', error)
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ],
}