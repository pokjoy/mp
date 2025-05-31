// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // 公开路径：解锁页 & 所有解锁 API
  const publicPaths = ['/unlock', '/api/unlock']
  if (publicPaths.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const token = req.cookies.get('unlock_token')?.value
  try {
    await jwtVerify(token || '', JWT_SECRET)
    return NextResponse.next()
  } catch {
    const url = req.nextUrl.clone()
    url.pathname = '/unlock'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }
}
