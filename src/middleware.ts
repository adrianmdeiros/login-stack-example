import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { auth } from "@/auth";

const privateRoutes = []

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith('/user')
  
  if (isProtectedRoute) {
    const token = request.cookies.get('token')?.value;
    const googleSession = await auth()

    if (!token && !googleSession) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (token) {
      const session = await decrypt(token)
      if (!session) {
        return NextResponse.redirect(new URL('/', request.url))
      }
      if (session.exp && session.exp < Date.now() / 1000) {
        return NextResponse.redirect(new URL('/', request.url))
      }
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
