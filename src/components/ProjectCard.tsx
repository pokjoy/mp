// src/components/ProjectCard.tsx
'use client'
import Link from 'next/link';
import Image from 'next/image';
import { TagBadge } from '@/components/TagBadge';
import { Project } from '@/config/types';
import { TiltCard } from '@/components/TiltCard'

export function ProjectCard({ title, description, tags, imageSrc, link }: Project) {
  return (
    <TiltCard>
      <Link 
        href={link || '#'} 
        className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-xl hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="flex">
          {/* 内容区域 */}
          <div className="flex-1 p-6">
            <h3 className="font-sans text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => <TagBadge key={tag} tag={tag} />)}
            </div>
          </div>
          
          {/* 图片区域 */}
          <div className="w-40 h-40 relative flex-shrink-0">
            <Image 
              src={imageSrc} 
              alt={title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            {/* 图片遮罩层 */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10 dark:to-gray-800/30"></div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}