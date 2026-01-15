import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const cookie = req.headers.get('sessionId') || ''

  const protectedRoutes = ['/dashboard', '/my-generate']
  const pathname = req.nextUrl.pathname

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const res = await fetch(
      'https://thumblify-backend.vercel.app/api/auth/verify',
      {
        headers: { cookie },
        credentials: 'include',
      }
    )

    if (res.status !== 200) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/my-generate/:path*'],
}
