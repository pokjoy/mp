// src/components/ButtonGroup.tsx
import { ButtonConfig } from '@/config/types';

interface ButtonGroupProps {
  buttons: ButtonConfig[];
}

export function ButtonGroup({ buttons }: ButtonGroupProps) {
  return (
    <div className="flex gap-4">
      {buttons.map((btn, idx) => (
        <a
          key={idx}
          href={btn.href}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition"
        >
          {btn.label}
        </a>
      ))}
    </div>
  );
}
