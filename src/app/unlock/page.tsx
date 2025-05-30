// src/app/unlock/page.tsx

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function UnlockPage() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/work'
  const slug = next.split('/').pop()!

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // 广告解锁
  const handleAd = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/ad-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        router.push(data.redirectTo)
      } else {
        setError(data.message || '广告解锁失败')
      }
    } catch {
      setError('网络错误')
    } finally {
      setLoading(false)
    }
  }

  // 访问码解锁
  const handleCode = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/code-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, slug }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        router.push(data.redirectTo)
      } else {
        setError(data.message || '访问码错误')
      }
    } catch {
      setError('网络错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      <h1 className="text-2xl font-semibold">内容需解锁</h1>
      <button onClick={handleAd} className="px-6 py-2 bg-green-600 text-white rounded">
        观看广告解锁（1 小时）
      </button>
      <div className="w-full max-w-xs space-y-2">
        <input
          type="text"
          placeholder="输入访问码"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
        />
        <button
          onClick={handleCode}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? '验证中…' : '使用访问码解锁（1 小时）'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

