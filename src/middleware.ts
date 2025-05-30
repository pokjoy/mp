// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED = new Set(['internup', 'secret-project'])

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // 只拦截 /work/:slug
  if (pathname.startsWith('/work/')) {
    const slug = pathname.replace(/^\/work\//, '').split('/')[0]
    if (PROTECTED.has(slug)) {
      const auth = req.cookies.get(process.env.COOKIE_NAME!)?.value
      if (auth !== 'authed') {
        const url = req.nextUrl.clone()
        url.pathname = '/auth'
        url.searchParams.set('from', pathname)
        return NextResponse.redirect(url)
      }
    }
  }
  return NextResponse.next()
}
