import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/', request.url))
  console.log('request', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    cookies: request.cookies

  })
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
