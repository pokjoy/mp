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
          <Link href={link || '#'} className="flex bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
          <div className="flex-1 p-4">
          <h3 className="font-sans text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
          {tags.map(tag => <TagBadge key={tag} tag={tag} />)}
         </div>
         </div>
          <div className="w-40 h-40 relative">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
      </Link>
      </TiltCard>
  );
}
