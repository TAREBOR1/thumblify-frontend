// middleware.ts in your project root
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('sessionId')
  

  if (request.nextUrl.pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  if(request.nextUrl.pathname==='/my-generate'||request.nextUrl.pathname==='/generate' ){
    if(!token){
      return NextResponse.redirect(new URL('/login',request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [ '/login','/my-generate','/generate']
}