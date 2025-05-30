// src/components/AuthForm.tsx
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  initialNext: string
}

export default function AuthForm({ initialNext }: Props) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, next: initialNext }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        // 前端手动跳转到后端返回的 redirectTo
        router.push(data.redirectTo)
      } else {
        setError(data.message || '验证失败，请重试')
      }
    } catch (err) {
      console.error('[AuthForm] fetch error:', err)
      setError(err instanceof Error ? err.message : '网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded shadow p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">请输入访问密码</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? '提交中…' : '提交'}
        </button>
      </form>
    </main>
  )
}