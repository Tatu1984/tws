'use client';

import { useBuilderStore } from '@/lib/stores';
import { cn } from '@/lib/utils';
import { Blocks, Settings, Layers } from 'lucide-react';
import type { ActivePanel } from '@/lib/stores';

const panels: { id: ActivePanel; icon: React.ElementType; label: string }[] = [
  { id: 'blocks', icon: Blocks, label: 'Blocks' },
  { id: 'properties', icon: Settings, label: 'Properties' },
  { id: 'layers', icon: Layers, label: 'Layers' },
];

export function BuilderSidebar() {
  const { activePanel, setActivePanel } = useBuilderStore();

  return (
    <div className="w-14 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4">
      {panels.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setActivePanel(activePanel === id ? null : id)}
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-colors',
            activePanel === id
              ? 'bg-zinc-800 text-amber-500'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          )}
          title={label}
        >
          <Icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
}
