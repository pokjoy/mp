// src/components/TagBadge.tsx
import { TAGS } from '@/config/tagConfig';

interface TagBadgeProps {
  tag: string;
}

export function TagBadge({ tag }: TagBadgeProps) {
  const config = TAGS[tag] || { label: tag, colorClass: 'bg-gray-100 text-gray-800' };
  return (
    <span className={`inline-block px-2 py-1 text-xs font-normal font-sans rounded-full ${config.colorClass}`}>
      {config.label}
    </span>
  );
}
