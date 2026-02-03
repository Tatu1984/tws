'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useBuilderStore } from '@/lib/stores';
import { BLOCK_DEFINITIONS, type BlockType, type BlockDefinition } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Layout,
  Columns,
  SeparatorHorizontal,
  Minus,
  Heading,
  Type,
  MousePointer,
  Square,
  LayoutGrid,
  Image,
  Video,
  Images,
  Star,
  Quote,
  Megaphone,
  Mail,
  HelpCircle,
  DollarSign,
  Users,
  BarChart,
  GitBranch,
  Layers,
  ChevronDown,
  Code,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Layout,
  Columns,
  SeparatorHorizontal,
  Minus,
  Heading,
  Type,
  MousePointer,
  Square,
  LayoutGrid,
  Image,
  Video,
  Images,
  Star,
  Quote,
  Megaphone,
  Mail,
  HelpCircle,
  DollarSign,
  Users,
  BarChart,
  GitBranch,
  Layers,
  ChevronDown,
  Code,
};

const categoryLabels: Record<string, string> = {
  layout: 'Layout',
  content: 'Content',
  media: 'Media',
  interactive: 'Interactive',
  advanced: 'Advanced',
};

interface DraggableBlockProps {
  definition: BlockDefinition;
}

function DraggableBlock({ definition }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${definition.type}`,
    data: {
      type: 'palette',
      blockType: definition.type,
    },
  });

  const Icon = iconMap[definition.icon] || Square;

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'flex flex-col items-center justify-center p-3 rounded-lg border border-zinc-200 bg-white cursor-grab transition-all',
        'hover:border-amber-500 hover:shadow-sm',
        isDragging && 'opacity-50 cursor-grabbing'
      )}
    >
      <Icon className="h-5 w-5 text-zinc-600 mb-1" />
      <span className="text-xs text-zinc-600 text-center">{definition.label}</span>
    </div>
  );
}

export function BlockPalette() {
  const { activePanel } = useBuilderStore();

  if (activePanel !== 'blocks') return null;

  // Group blocks by category
  const groupedBlocks = BLOCK_DEFINITIONS.reduce(
    (acc, block) => {
      if (!acc[block.category]) {
        acc[block.category] = [];
      }
      acc[block.category].push(block);
      return acc;
    },
    {} as Record<string, BlockDefinition[]>
  );

  const categories = ['layout', 'content', 'media', 'interactive', 'advanced'];

  return (
    <div className="w-64 bg-zinc-50 border-l border-zinc-200 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4">Add Blocks</h3>
        <p className="text-xs text-zinc-500 mb-4">
          Drag blocks onto the canvas to add them to your page
        </p>

        {categories.map((category) => {
          const blocks = groupedBlocks[category];
          if (!blocks || blocks.length === 0) return null;

          return (
            <div key={category} className="mb-6">
              <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                {categoryLabels[category]}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {blocks.map((block) => (
                  <DraggableBlock key={block.type} definition={block} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
