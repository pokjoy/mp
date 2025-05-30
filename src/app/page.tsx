// src/app/page.tsx
import { ButtonGroup } from '@/components/ButtonGroup';
import { ProjectCard } from '@/components/ProjectCard';
import { Project } from '@/config/types';
import { TypewriterText } from '@/components/TypewriterText'

export const metadata = {
  title: 'Qiuzi Feng - Portfolio',
  description: "Jennifer Feng's personal portfolio, showcasing UI/UX, market research, and emerging technology projects.",
}

export default function Home() {
  // 示例项目数据
  const projects: Project[] = [
    {
      title: 'InternUp',
      description: 'Connect international talent with job opportunities',
      tags: ['InProgress1', 'Internship1', 'UIUX', 'WebDesign', 'B2C'],
      imageSrc: '/images/qfeng5/image_86.png',
      link: '/work/internup'
    },
    {
      title: 'SnowOverflow',
      description: 'Your Ultimate Shredding Companion',
      tags: ['InProgress2', 'LaunchingSoon', 'UIUX', 'MobileApp'],
      imageSrc: '/images/project-b.jpg',
      link: '/work/snowoverflow'
    },
    {
      title: 'Ai Roboto Edu',
      description: 'Designed for skill-building and government-backed careers',
      tags: ['Internship2', 'UIUX', 'WebDesign', 'B2B'],
      imageSrc: '/images/project-c.jpg',
      link: '/work/c'
    }
    // …更多项目
  ];

   return (
    <div className="mx-auto max-w-4xl px-4 min-h-screen">
      {/* 外层容器：居中 + 最大宽度 + 两侧内边距 */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* 左侧：个人介绍 */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-6 lg:p-12 space-y-6">
          <h1
            className="text-5xl font-extrabold"
            style={{ fontFamily: 'Satoshi', fontWeight: 700 }}
          >
            Qiuzi Feng
          </h1>
          <p
            className="text-lg"
            style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
          >
            <TypewriterText text="Based in Seattle, WA. I am a designer and researcher specializing in UI/UX design, market research, and emerging technology." />
          </p>
          <ButtonGroup
            buttons={[
              { label: 'Email',    href: 'mailto:qfeng5@example.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/qfeng5' },
              { label: 'Resume',   href: '/resume.pdf' },
            ]}
          />
        </div>

        {/* 右侧：项目列表 */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 space-y-6 overflow-y-auto">
          {projects.map((proj, idx) => (
            <ProjectCard
              key={idx}
              title={proj.title}
              description={proj.description}
              tags={proj.tags}
              imageSrc={proj.imageSrc}
              link={proj.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
