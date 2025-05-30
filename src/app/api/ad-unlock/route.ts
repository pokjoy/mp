// src/app/api/ad-unlock/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  const { slug } = await request.json()
  if (!slug) {
    return NextResponse.json({ success: false, message: '缺少 slug' }, { status: 400 })
  }
  // exp 从环境变量读取
  const exp = Number(process.env.AD_UNLOCK_EXP)
  const token = await signToken({ type: 'ad', slug, exp })
  const res = NextResponse.json({ success: true, redirectTo: `/work/${slug}` })
  res.cookies.set({
    name:     process.env.COOKIE_NAME!,
    value:    token,
    path:     '/',
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    maxAge:   exp,
    sameSite: 'lax',
  })
  return res
}

