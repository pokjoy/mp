// src/app/page.tsx
'use client'

import { ButtonGroup } from '@/components/ButtonGroup';
import { ProjectCard } from '@/components/ProjectCard';
import { Project } from '@/config/types';
import { TypewriterText } from '@/components/TypewriterText'

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
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30 dark:from-gray-800/30 dark:via-transparent dark:to-gray-700/20"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/20 dark:bg-yellow-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-pink-400/20 dark:bg-pink-500/10 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 min-h-screen">
        <div className="flex flex-col lg:flex-row flex-1 pt-8">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-6 lg:p-12 space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Qiuzi Feng
              </h1>
              <div className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                <TypewriterText text="Based in Seattle, WA. I am a designer and researcher specializing in UI/UX design, market research, and emerging technology." />
              </div>
            </div>

            <ButtonGroup
              buttons={[
                { label: 'Email', href: 'mailto:qfeng5@example.com' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/qfeng5' },
                { label: 'Resume', href: '/resume.pdf' },
              ]}
            />

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ideas</div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-6 lg:p-12 space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Featured Work</h2>
              <p className="text-gray-600 dark:text-gray-400">Explore my latest projects and case studies</p>
            </div>

            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
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
      </div>
    </div>
  );
}