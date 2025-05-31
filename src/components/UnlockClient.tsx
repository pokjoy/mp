// src/components/UnlockClient.tsx (临时调试版)
'use client'

import { useRouter } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { useState } from 'react'
import { AdPlayer } from './AdPlayer'

interface Props {
  initialNext: string
}

function UnlockCore({ initialNext }: Props) {
  const router = useRouter()
  const next = initialNext
  const slug = next.split('/').pop()!

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAdPlayer, setShowAdPlayer] = useState(false)
  const [debugInfo, setDebugInfo] = useState('')

  useEffect(() => {
    setCode('')
    setError('')
    setLoading(false)
    setDebugInfo('组件已加载')
  }, [])

  const handleAd = async () => {
    setError('')
    setLoading(true)
    setDebugInfo('开始请求广告...')
    
    try {
      console.log('🎬 请求广告视频...')
      const res = await fetch('/api/get-ad-video')
      const data = await res.json()
      
      console.log('🎬 广告 API 响应:', { status: res.status, data })
      setDebugInfo(`API 响应: ${res.status}, 数据: ${JSON.stringify(data)}`)
      
      if (res.ok && data.videoPath) {
        console.log('✅ 显示广告播放器')
        setDebugInfo('显示广告播放器')
        setShowAdPlayer(true)
      } else {
        console.log('❌ 没有可用广告')
        setDebugInfo(`错误: ${data.error}`)
        setError(data.error || '暂无可用广告，请稍后再试')
      }
    } catch (err) {
      console.log('❌ 网络错误:', err)
      setDebugInfo(`网络错误: ${err}`)
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleCode = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    
    if (!code.trim()) {
      setError('请输入访问码')
      return
    }
    
    setError('')
    setLoading(true)
    
    try {
      const res = await fetch('/api/code-unlock', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ code: code.trim(), slug }),
      })
      const data = await res.json()
      
      if (res.ok && data.success) {
        router.push(data.redirectTo)
      } else {
        setError(data.message || '访问码错误')
        setCode('')
      }
    } catch {
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCode()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
    if (error) {
      setError('')
    }
  }

  const handleCodeButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    handleCode()
  }

  const isCodeButtonDisabled = loading || !code.trim()

  console.log('🔍 组件状态:', { showAdPlayer, loading, error, debugInfo })

  // 如果正在播放广告，显示广告播放器
  if (showAdPlayer) {
    console.log('🎥 渲染广告播放器')
    return <AdPlayer next={next} />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      <h1 className="text-2xl font-semibold">内容需解锁</h1>
      
      <button
        type="button"
        onClick={handleAd}
        disabled={loading}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition"
      >
        {loading ? '检查广告中...' : '观看广告解锁（1 小时）'}
      </button>
      
      <form onSubmit={handleCode} className="w-full max-w-xs space-y-2">
        <input
          type="text"
          placeholder="输入访问码"
          value={code}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          autoComplete="off"
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300 disabled:opacity-50"
        />
        <button
          type="submit"
          onClick={handleCodeButtonClick}
          disabled={isCodeButtonDisabled}
          className={`w-full py-2 rounded transition font-medium ${
            isCodeButtonDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {loading ? '验证中…' : '使用访问码解锁（1 小时）'}
        </button>
      </form>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded max-w-xs w-full text-center">
          {error}
          <button
            type="button"
            onClick={() => setError('')}
            className="ml-2 text-red-900 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* 调试信息 */}
      <div className="text-xs text-gray-500 text-center max-w-xs">
        <p>调试: {debugInfo}</p>
        <p>显示播放器: {showAdPlayer ? '是' : '否'}</p>
      </div>
    </div>
  )
}

export default function UnlockClientWrapper(props: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中…</div>}>
      <UnlockCore {...props} />
    </Suspense>
  )
}