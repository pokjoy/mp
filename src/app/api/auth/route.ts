// src/app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password, next } = await request.json()

  if (password === process.env.PROJECT_PASSWORD) {
    // 如果 next 合法（以 /work/ 开头）就跳转它，否则默认 /work
    const redirectTo =
      typeof next === 'string' && next.startsWith('/work/')
        ? next
        : '/work'

    // 写入 HttpOnly Cookie
    const res = NextResponse.json({ success: true, redirectTo }, { status: 200 })
    res.cookies.set({
      name:     process.env.COOKIE_NAME!,
      value:    password,
      maxAge:   Number(process.env.COOKIE_MAX_AGE),
      path:     '/',
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    return res
  }

  // 密码错误
  return NextResponse.json(
    { success: false, message: '密码错误' },
    { status: 401 }
  )
}

