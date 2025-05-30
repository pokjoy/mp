// src/app/not-found.tsx
'use client'

import BackHomeButton from '@/components/BackHomeButton'
import GlitchImage from '@/components/GlitchImage'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
      {/* 大标题 */}
      <h1 className="text-6xl font-bold mb-4">404</h1>
      {/* 辅助说明 */}
      <p className="text-lg mb-8 text-center">
        This page doesn’t exist. Click the Home button in the top left corner to get back on track!
      </p>

      {/* 故障图 */}
      <GlitchImage />

      {/* 可选：也保留全局的 BackHomeButton（固定在左下） */}
      <BackHomeButton />
    </div>
  )
}
