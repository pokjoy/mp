// src/app/auth/page.tsx
import AuthForm from '@/components/AuthForm'

export default async function AuthPage({
  // App Router 中 searchParams 也是 Promise
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  // 解包 next 参数，如果没有则默认跳到 /work
  const { next } = await searchParams
  const initialNext = next ?? '/work'
  return <AuthForm initialNext={initialNext} />
}
