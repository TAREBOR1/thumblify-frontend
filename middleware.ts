// middleware.ts in your project root
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('sessionId') // or your session cookie name
  
  // Protect /my-generate route
//   if (request.nextUrl.pathname.startsWith('/my-generate')) {
//     if (!token) {
//       return NextResponse.redirect(new URL('/login', request.url))
//     }
//   }
  
  // If logged in, redirect from /login to home
  if (request.nextUrl.pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [ '/login']
}