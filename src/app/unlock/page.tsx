import { Suspense } from 'react'

export const metadata = {
  title: '内容解锁',
}

export default function UnlockPage() {
  return (
    <Suspense fallback={<div>加载中…</div>}>
      {/* UnlockClient 会在加载完成后 hydratate */}
      {/* ⚠️ 注意这里改为相对路径或别名引入 */}
      <UnlockClient />
    </Suspense>
  )
}

// 因为 page.tsx 是 Server 组件，所以这里不需要 'use client'
import UnlockClient from './UnlockClient'

