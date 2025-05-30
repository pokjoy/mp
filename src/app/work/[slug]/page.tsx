// src/app/work/[slug]/page.tsx
import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import ProjectDetailPage from '@/components/ProjectDetailPage'
import { PROJECTS } from '@/config/work'
import { verifyToken } from '@/lib/jwt'
import type { ProjectDetail } from '@/config/types'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project: ProjectDetail | undefined = PROJECTS[slug]
  if (!project) return notFound()

  if (project.protected) {
    // 1. 拿到 cookie 存储对象（需要 await）
    const cookieStore = await cookies()
    // 2. 读取 token
    const token = cookieStore.get(process.env.COOKIE_NAME!)?.value
    if (!token) {
      redirect(`/unlock?next=/work/${slug}`)
    }
    try {
      const payload = await verifyToken(token)
      if (payload.slug !== slug) throw new Error('slug mismatch')
    } catch {
      redirect(`/unlock?next=/work/${slug}`)
    }
  }

  return <ProjectDetailPage project={project} />
}
