import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith('/user')
  const authToken = request.cookies.get('token')?.value;

  if (isProtectedRoute) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET)
      const { payload } = await jwtVerify(authToken, secret) 
      const { exp } = payload;
      const currentTime = Date.now() / 1000;

      if (exp && exp < currentTime) {
        return NextResponse.redirect(new URL('/', request.url))
      }

      return NextResponse.next()
      
    } catch (error) {
      console.error('Invalid token.', error)
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
  
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
export { auth } from "@/auth"
