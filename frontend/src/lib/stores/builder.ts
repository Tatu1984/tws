import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Section, ContentBlock, BlockType, BLOCK_DEFINITIONS } from '../types';

// History entry for undo/redo
interface HistoryEntry {
  sections: Section[];
  timestamp: number;
}

// Builder view modes
export type ViewMode = 'desktop' | 'tablet' | 'mobile';

// Builder panel
export type ActivePanel = 'blocks' | 'properties' | 'layers' | 'settings' | null;

interface BuilderState {
  // Page data
  pageId: string | null;
  sections: Section[];
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;

  // Selection state
  selectedSectionId: string | null;
  selectedBlockId: string | null;
  hoveredBlockId: string | null;

  // UI state
  viewMode: ViewMode;
  activePanel: ActivePanel;
  isPreviewMode: boolean;
  zoom: number;

  // History for undo/redo
  history: HistoryEntry[];
  historyIndex: number;
  maxHistorySize: number;

  // Drag state
  isDragging: boolean;
  draggedBlockType: BlockType | null;
  draggedBlockId: string | null;

  // Actions - Page
  initBuilder: (pageId: string, sections: Section[]) => void;
  resetBuilder: () => void;
  setSections: (sections: Section[]) => void;
  setIsDirty: (isDirty: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setLastSaved: (date: Date) => void;

  // Actions - Sections
  addSection: (section: Omit<Section, '_id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  duplicateSection: (sectionId: string) => void;

  // Actions - Blocks
  addBlock: (sectionId: string, blockType: BlockType, index?: number) => void;
  updateBlock: (sectionId: string, blockId: string, updates: Partial<ContentBlock>) => void;
  deleteBlock: (sectionId: string, blockId: string) => void;
  reorderBlocks: (sectionId: string, fromIndex: number, toIndex: number) => void;
  moveBlockToSection: (fromSectionId: string, toSectionId: string, blockId: string, toIndex: number) => void;
  duplicateBlock: (sectionId: string, blockId: string) => void;

  // Actions - Selection
  selectSection: (sectionId: string | null) => void;
  selectBlock: (sectionId: string | null, blockId: string | null) => void;
  setHoveredBlock: (blockId: string | null) => void;
  clearSelection: () => void;

  // Actions - UI
  setViewMode: (mode: ViewMode) => void;
  setActivePanel: (panel: ActivePanel) => void;
  togglePreviewMode: () => void;
  setZoom: (zoom: number) => void;

  // Actions - Drag
  setDragging: (isDragging: boolean, blockType?: BlockType | null, blockId?: string | null) => void;

  // Actions - History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  pushHistory: () => void;
}

// Get default content for block type
const getDefaultBlockContent = (type: BlockType): Record<string, unknown> => {
  const { BLOCK_DEFINITIONS } = require('../types');
  const definition = BLOCK_DEFINITIONS.find((d: typeof BLOCK_DEFINITIONS[number]) => d.type === type);
  return definition?.defaultContent || {};
};

// Create a new block
const createBlock = (type: BlockType, order: number): ContentBlock => ({
  id: uuidv4(),
  type,
  content: getDefaultBlockContent(type),
  style: {},
  order,
});

// Create a new section
const createSection = (name: string): Omit<Section, '_id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'> => ({
  name,
  type: 'section',
  blocks: [],
  style: {},
  settings: { containerWidth: 'default' },
  isGlobal: false,
});

export const useBuilderStore = create<BuilderState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    pageId: null,
    sections: [],
    isDirty: false,
    isSaving: false,
    lastSaved: null,

    selectedSectionId: null,
    selectedBlockId: null,
    hoveredBlockId: null,

    viewMode: 'desktop',
    activePanel: 'blocks',
    isPreviewMode: false,
    zoom: 100,

    history: [],
    historyIndex: -1,
    maxHistorySize: 50,

    isDragging: false,
    draggedBlockType: null,
    draggedBlockId: null,

    // Page actions
    initBuilder: (pageId, sections) => {
      set({
        pageId,
        sections,
        isDirty: false,
        selectedSectionId: null,
        selectedBlockId: null,
        history: [{ sections: JSON.parse(JSON.stringify(sections)), timestamp: Date.now() }],
        historyIndex: 0,
      });
    },

    resetBuilder: () => {
      set({
        pageId: null,
        sections: [],
        isDirty: false,
        isSaving: false,
        lastSaved: null,
        selectedSectionId: null,
        selectedBlockId: null,
        hoveredBlockId: null,
        viewMode: 'desktop',
        activePanel: 'blocks',
        isPreviewMode: false,
        zoom: 100,
        history: [],
        historyIndex: -1,
        isDragging: false,
        draggedBlockType: null,
        draggedBlockId: null,
      });
    },

    setSections: (sections) => {
      set({ sections, isDirty: true });
      get().pushHistory();
    },

    setIsDirty: (isDirty) => set({ isDirty }),
    setIsSaving: (isSaving) => set({ isSaving }),
    setLastSaved: (date) => set({ lastSaved: date, isDirty: false }),

    // Section actions
    addSection: (sectionData) => {
      const newSection: Section = {
        ...sectionData,
        _id: uuidv4(),
        createdBy: '',
        updatedBy: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({
        sections: [...state.sections, newSection],
        isDirty: true,
        selectedSectionId: newSection._id,
        selectedBlockId: null,
      }));
      get().pushHistory();
    },

    updateSection: (sectionId, updates) => {
      set((state) => ({
        sections: state.sections.map((s) =>
          s._id === sectionId ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
        ),
        isDirty: true,
      }));
      get().pushHistory();
    },

    deleteSection: (sectionId) => {
      set((state) => ({
        sections: state.sections.filter((s) => s._id !== sectionId),
        isDirty: true,
        selectedSectionId: state.selectedSectionId === sectionId ? null : state.selectedSectionId,
        selectedBlockId: state.selectedSectionId === sectionId ? null : state.selectedBlockId,
      }));
      get().pushHistory();
    },

    reorderSections: (fromIndex, toIndex) => {
      set((state) => {
        const sections = [...state.sections];
        const [removed] = sections.splice(fromIndex, 1);
        sections.splice(toIndex, 0, removed);
        return { sections, isDirty: true };
      });
      get().pushHistory();
    },

    duplicateSection: (sectionId) => {
      set((state) => {
        const sectionIndex = state.sections.findIndex((s) => s._id === sectionId);
        if (sectionIndex === -1) return state;

        const section = state.sections[sectionIndex];
        const newSection: Section = {
          ...JSON.parse(JSON.stringify(section)),
          _id: uuidv4(),
          name: `${section.name} (copy)`,
          blocks: section.blocks.map((b) => ({ ...b, id: uuidv4() })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const sections = [...state.sections];
        sections.splice(sectionIndex + 1, 0, newSection);

        return { sections, isDirty: true, selectedSectionId: newSection._id };
      });
      get().pushHistory();
    },

    // Block actions
    addBlock: (sectionId, blockType, index) => {
      set((state) => {
        const sections = state.sections.map((section) => {
          if (section._id !== sectionId) return section;

          const blocks = [...section.blocks];
          const insertIndex = index ?? blocks.length;
          const newBlock = createBlock(blockType, insertIndex);

          // Update order for blocks after insert point
          blocks.forEach((b, i) => {
            if (i >= insertIndex) b.order = i + 1;
          });

          blocks.splice(insertIndex, 0, newBlock);

          return {
            ...section,
            blocks,
            updatedAt: new Date().toISOString(),
          };
        });

        const addedSection = sections.find((s) => s._id === sectionId);
        const addedBlock = addedSection?.blocks.find(
          (b) => b.order === (index ?? addedSection.blocks.length - 1)
        );

        return {
          sections,
          isDirty: true,
          selectedSectionId: sectionId,
          selectedBlockId: addedBlock?.id || null,
        };
      });
      get().pushHistory();
    },

    updateBlock: (sectionId, blockId, updates) => {
      set((state) => ({
        sections: state.sections.map((section) => {
          if (section._id !== sectionId) return section;
          return {
            ...section,
            blocks: section.blocks.map((block) =>
              block.id === blockId ? { ...block, ...updates } : block
            ),
            updatedAt: new Date().toISOString(),
          };
        }),
        isDirty: true,
      }));
      get().pushHistory();
    },

    deleteBlock: (sectionId, blockId) => {
      set((state) => ({
        sections: state.sections.map((section) => {
          if (section._id !== sectionId) return section;
          const blocks = section.blocks
            .filter((b) => b.id !== blockId)
            .map((b, i) => ({ ...b, order: i }));
          return { ...section, blocks, updatedAt: new Date().toISOString() };
        }),
        isDirty: true,
        selectedBlockId: state.selectedBlockId === blockId ? null : state.selectedBlockId,
      }));
      get().pushHistory();
    },

    reorderBlocks: (sectionId, fromIndex, toIndex) => {
      set((state) => ({
        sections: state.sections.map((section) => {
          if (section._id !== sectionId) return section;
          const blocks = [...section.blocks];
          const [removed] = blocks.splice(fromIndex, 1);
          blocks.splice(toIndex, 0, removed);
          return {
            ...section,
            blocks: blocks.map((b, i) => ({ ...b, order: i })),
            updatedAt: new Date().toISOString(),
          };
        }),
        isDirty: true,
      }));
      get().pushHistory();
    },

    moveBlockToSection: (fromSectionId, toSectionId, blockId, toIndex) => {
      set((state) => {
        let movedBlock: ContentBlock | null = null;

        const sections = state.sections.map((section) => {
          if (section._id === fromSectionId) {
            const blockIndex = section.blocks.findIndex((b) => b.id === blockId);
            if (blockIndex !== -1) {
              movedBlock = { ...section.blocks[blockIndex] };
              const blocks = section.blocks
                .filter((b) => b.id !== blockId)
                .map((b, i) => ({ ...b, order: i }));
              return { ...section, blocks, updatedAt: new Date().toISOString() };
            }
          }
          return section;
        });

        if (!movedBlock) return state;

        return {
          sections: sections.map((section) => {
            if (section._id === toSectionId) {
              const blocks = [...section.blocks];
              blocks.splice(toIndex, 0, movedBlock!);
              return {
                ...section,
                blocks: blocks.map((b, i) => ({ ...b, order: i })),
                updatedAt: new Date().toISOString(),
              };
            }
            return section;
          }),
          isDirty: true,
        };
      });
      get().pushHistory();
    },

    duplicateBlock: (sectionId, blockId) => {
      set((state) => ({
        sections: state.sections.map((section) => {
          if (section._id !== sectionId) return section;

          const blockIndex = section.blocks.findIndex((b) => b.id === blockId);
          if (blockIndex === -1) return section;

          const block = section.blocks[blockIndex];
          const newBlock: ContentBlock = {
            ...JSON.parse(JSON.stringify(block)),
            id: uuidv4(),
            order: blockIndex + 1,
          };

          const blocks = [...section.blocks];
          blocks.splice(blockIndex + 1, 0, newBlock);

          return {
            ...section,
            blocks: blocks.map((b, i) => ({ ...b, order: i })),
            updatedAt: new Date().toISOString(),
          };
        }),
        isDirty: true,
      }));
      get().pushHistory();
    },

    // Selection actions
    selectSection: (sectionId) => {
      set({ selectedSectionId: sectionId, selectedBlockId: null });
    },

    selectBlock: (sectionId, blockId) => {
      set({ selectedSectionId: sectionId, selectedBlockId: blockId });
    },

    setHoveredBlock: (blockId) => {
      set({ hoveredBlockId: blockId });
    },

    clearSelection: () => {
      set({ selectedSectionId: null, selectedBlockId: null });
    },

    // UI actions
    setViewMode: (mode) => set({ viewMode: mode }),
    setActivePanel: (panel) => set({ activePanel: panel }),
    togglePreviewMode: () => set((state) => ({ isPreviewMode: !state.isPreviewMode })),
    setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 25), 200) }),

    // Drag actions
    setDragging: (isDragging, blockType = null, blockId = null) => {
      set({ isDragging, draggedBlockType: blockType, draggedBlockId: blockId });
    },

    // History actions
    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        set({
          sections: JSON.parse(JSON.stringify(history[newIndex].sections)),
          historyIndex: newIndex,
          isDirty: true,
        });
      }
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        set({
          sections: JSON.parse(JSON.stringify(history[newIndex].sections)),
          historyIndex: newIndex,
          isDirty: true,
        });
      }
    },

    canUndo: () => get().historyIndex > 0,
    canRedo: () => get().historyIndex < get().history.length - 1,

    pushHistory: () => {
      const { sections, history, historyIndex, maxHistorySize } = get();

      // Remove any future history (if we've undone and are making a new change)
      const newHistory = history.slice(0, historyIndex + 1);

      // Add current state
      newHistory.push({
        sections: JSON.parse(JSON.stringify(sections)),
        timestamp: Date.now(),
      });

      // Limit history size
      if (newHistory.length > maxHistorySize) {
        newHistory.shift();
      }

      set({
        history: newHistory,
        historyIndex: newHistory.length - 1,
      });
    },
  }))
);

// Selector hooks for specific parts of state
export const useSelectedSection = () => {
  const sections = useBuilderStore((state) => state.sections);
  const selectedSectionId = useBuilderStore((state) => state.selectedSectionId);
  return sections.find((s) => s._id === selectedSectionId) || null;
};

export const useSelectedBlock = () => {
  const sections = useBuilderStore((state) => state.sections);
  const selectedSectionId = useBuilderStore((state) => state.selectedSectionId);
  const selectedBlockId = useBuilderStore((state) => state.selectedBlockId);

  const section = sections.find((s) => s._id === selectedSectionId);
  return section?.blocks.find((b) => b.id === selectedBlockId) || null;
};
