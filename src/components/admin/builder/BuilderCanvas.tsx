'use client';

import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilderStore, useSelectedSection, useSelectedBlock } from '@/lib/stores';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Trash, Copy, Settings } from 'lucide-react';
import type { Section, ContentBlock, BlockType } from '@/lib/types';
import { BLOCK_DEFINITIONS } from '@/lib/types';
import { useState } from 'react';

interface SortableSectionProps {
  section: Section;
  children: React.ReactNode;
}

function SortableSection({ section, children }: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section._id });

  const {
    selectedSectionId,
    selectSection,
    deleteSection,
    duplicateSection,
  } = useBuilderStore();

  const isSelected = selectedSectionId === section._id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group border-2 rounded-lg mb-4 transition-colors',
        isDragging && 'opacity-50',
        isSelected ? 'border-amber-500' : 'border-transparent hover:border-zinc-300'
      )}
      onClick={(e) => {
        e.stopPropagation();
        selectSection(section._id);
      }}
    >
      {/* Section toolbar */}
      <div
        className={cn(
          'absolute -top-8 left-0 right-0 flex items-center justify-between px-2 py-1 bg-zinc-800 text-white text-sm rounded-t-lg transition-opacity',
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}
      >
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab hover:text-amber-400"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <span>{section.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              duplicateSection(section._id);
            }}
            className="p-1 hover:text-amber-400"
            title="Duplicate section"
          >
            <Copy className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteSection(section._id);
            }}
            className="p-1 hover:text-red-400"
            title="Delete section"
          >
            <Trash className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Section content */}
      <div className="p-4">{children}</div>
    </div>
  );
}

interface SortableBlockProps {
  sectionId: string;
  block: ContentBlock;
}

function SortableBlock({ sectionId, block }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const {
    selectedBlockId,
    selectBlock,
    deleteBlock,
    duplicateBlock,
    setActivePanel,
  } = useBuilderStore();

  const isSelected = selectedBlockId === block.id;
  const blockDef = BLOCK_DEFINITIONS.find((d) => d.type === block.type);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group border-2 rounded-lg p-4 bg-white transition-colors',
        isDragging && 'opacity-50',
        isSelected ? 'border-amber-500' : 'border-zinc-200 hover:border-zinc-400'
      )}
      onClick={(e) => {
        e.stopPropagation();
        selectBlock(sectionId, block.id);
        setActivePanel('properties');
      }}
    >
      {/* Block toolbar */}
      <div
        className={cn(
          'absolute -top-7 left-2 right-2 flex items-center justify-between px-2 py-1 bg-zinc-700 text-white text-xs rounded-t transition-opacity',
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}
      >
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab hover:text-amber-400"
          >
            <GripVertical className="h-3 w-3" />
          </button>
          <span>{blockDef?.label || block.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePanel('properties');
            }}
            className="p-1 hover:text-amber-400"
            title="Edit block"
          >
            <Settings className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              duplicateBlock(sectionId, block.id);
            }}
            className="p-1 hover:text-amber-400"
            title="Duplicate block"
          >
            <Copy className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteBlock(sectionId, block.id);
            }}
            className="p-1 hover:text-red-400"
            title="Delete block"
          >
            <Trash className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Block preview */}
      <div className="min-h-[60px] flex items-center justify-center text-zinc-400">
        <div className="text-center">
          <span className="text-sm font-medium">{blockDef?.label || block.type}</span>
          <p className="text-xs mt-1">{blockDef?.description}</p>
        </div>
      </div>
    </div>
  );
}

export function BuilderCanvas() {
  const {
    sections,
    viewMode,
    isPreviewMode,
    addSection,
    addBlock,
    reorderSections,
    reorderBlocks,
    moveBlockToSection,
    selectSection,
    clearSelection,
    setDragging,
  } = useBuilderStore();

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    const data = active.data.current;
    if (data?.type === 'palette') {
      setDragging(true, data.blockType);
    } else {
      setDragging(true, null, active.id as string);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setDragging(false);

    if (!over) return;

    const activeData = active.data.current;

    // Dropping from palette
    if (activeData?.type === 'palette') {
      const blockType = activeData.blockType as BlockType;
      // Find which section to add to
      const targetSectionId = (over.data.current as { sectionId?: string })?.sectionId;
      if (targetSectionId) {
        addBlock(targetSectionId, blockType);
      } else if (sections.length > 0) {
        // Add to last section if no specific target
        addBlock(sections[sections.length - 1]._id, blockType);
      }
      return;
    }

    // Reordering sections
    if (sections.some((s) => s._id === active.id)) {
      const oldIndex = sections.findIndex((s) => s._id === active.id);
      const newIndex = sections.findIndex((s) => s._id === over.id);
      if (oldIndex !== newIndex && newIndex !== -1) {
        reorderSections(oldIndex, newIndex);
      }
      return;
    }

    // Reordering blocks within same section or moving between sections
    for (const section of sections) {
      const blockIndex = section.blocks.findIndex((b) => b.id === active.id);
      if (blockIndex !== -1) {
        const overData = over.data.current as { sectionId?: string };
        const targetSectionId = overData?.sectionId || section._id;
        const targetSection = sections.find((s) => s._id === targetSectionId);

        if (targetSection) {
          const targetIndex = targetSection.blocks.findIndex((b) => b.id === over.id);
          if (targetSectionId === section._id) {
            // Same section
            if (blockIndex !== targetIndex && targetIndex !== -1) {
              reorderBlocks(section._id, blockIndex, targetIndex);
            }
          } else {
            // Different section
            moveBlockToSection(
              section._id,
              targetSectionId,
              active.id as string,
              targetIndex === -1 ? targetSection.blocks.length : targetIndex
            );
          }
        }
        break;
      }
    }
  };

  const canvasWidth = viewMode === 'desktop' ? '100%' : viewMode === 'tablet' ? '768px' : '375px';

  const handleAddSection = () => {
    addSection({
      name: `Section ${sections.length + 1}`,
      type: 'section',
      blocks: [],
      style: {},
      settings: { containerWidth: 'default' },
      isGlobal: false,
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="flex-1 bg-zinc-100 overflow-auto p-8"
        onClick={() => clearSelection()}
      >
        <div
          className="mx-auto bg-white min-h-[600px] rounded-lg shadow-lg transition-all"
          style={{ width: canvasWidth, maxWidth: '100%' }}
        >
          {sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-lg font-medium text-zinc-900">No sections yet</h3>
              <p className="text-zinc-500 mt-1 mb-4">
                Add sections to start building your page
              </p>
              <Button onClick={handleAddSection}>
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </div>
          ) : (
            <div className="p-6">
              <SortableContext
                items={sections.map((s) => s._id)}
                strategy={verticalListSortingStrategy}
              >
                {sections.map((section) => (
                  <SortableSection key={section._id} section={section}>
                    {section.blocks.length === 0 ? (
                      <div className="border-2 border-dashed border-zinc-200 rounded-lg p-8 text-center">
                        <p className="text-sm text-zinc-400">
                          Drag blocks here or click to add
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            addBlock(section._id, 'text');
                          }}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Add Block
                        </Button>
                      </div>
                    ) : (
                      <SortableContext
                        items={section.blocks.map((b) => b.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-3">
                          {section.blocks.map((block) => (
                            <SortableBlock
                              key={block.id}
                              sectionId={section._id}
                              block={block}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    )}
                  </SortableSection>
                ))}
              </SortableContext>

              {/* Add section button */}
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={handleAddSection}
                  className="w-full border-dashed"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Section
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DragOverlay>
        {activeId && (
          <div className="bg-white border-2 border-amber-500 rounded-lg p-4 shadow-lg opacity-90">
            <span className="text-sm font-medium">Dragging...</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
