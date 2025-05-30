// src/app/unlock/page.tsx
import UnlockClient from '@/components/UnlockClient'

/**
 * Server Component：通过 Props 接收 searchParams
 * 避免直接在这里调用 useSearchParams()
 */
export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  const initialNext = next ?? '/work'
  return <UnlockClient initialNext={initialNext} />
}
