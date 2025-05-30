// src/app/work/[slug]/page.tsx
import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import ProjectDetailPage from '@/components/ProjectDetailPage'
import { PROJECTS } from '@/config/work'
import type { ProjectDetail } from '@/config/types'

export default async function ProjectPage({
  // App Router 中 params 是异步的 Promise 对象
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // 1. 解包 slug
  const { slug } = await params

  // 2. 查找项目配置
  const project: ProjectDetail | undefined = PROJECTS[slug]
  if (!project) {
    return notFound()
  }

  // 3. 如果项目受保护，检查 Cookie
  if (project.protected) {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get(process.env.COOKIE_NAME!)
    if (!authCookie || authCookie.value !== process.env.PROJECT_PASSWORD) {
      // 4. 未登录则重定向到登录页，并带上 next 参数
      redirect(`/auth?next=/work/${slug}`)
    }
  }

  // 5. 校验通过，渲染详情页组件
  return <ProjectDetailPage project={project} />
}

