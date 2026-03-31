'use client';

import Link from 'next/link';
import { useBuilderStore } from '@/lib/stores';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ArrowLeft,
  Save,
  Eye,
  Undo,
  Redo,
  Monitor,
  Tablet,
  Smartphone,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ViewMode } from '@/lib/stores';

interface BuilderToolbarProps {
  pageId: string;
  pageTitle: string;
  onSave: () => void;
  onPreview: () => void;
}

export function BuilderToolbar({
  pageId,
  pageTitle,
  onSave,
  onPreview,
}: BuilderToolbarProps) {
  const {
    isDirty,
    isSaving,
    lastSaved,
    viewMode,
    setViewMode,
    isPreviewMode,
    togglePreviewMode,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useBuilderStore();

  const viewModes: { mode: ViewMode; icon: React.ElementType; label: string }[] = [
    { mode: 'desktop', icon: Monitor, label: 'Desktop' },
    { mode: 'tablet', icon: Tablet, label: 'Tablet' },
    { mode: 'mobile', icon: Smartphone, label: 'Mobile' },
  ];

  return (
    <TooltipProvider>
      <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4">
        {/* Left side - Back and title */}
        <div className="flex items-center gap-4">
          <Link href={`/admin/pages/${pageId}`}>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{pageTitle}</span>
            {isDirty && (
              <span className="text-xs text-amber-500">Unsaved changes</span>
            )}
          </div>
        </div>

        {/* Center - View mode and undo/redo */}
        <div className="flex items-center gap-2">
          {/* Undo/Redo */}
          <div className="flex items-center gap-1 mr-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => undo()}
                  disabled={!canUndo()}
                  className="text-zinc-400 hover:text-white disabled:opacity-50"
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => redo()}
                  disabled={!canRedo()}
                  className="text-zinc-400 hover:text-white disabled:opacity-50"
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
            </Tooltip>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center bg-zinc-800 rounded-lg p-1">
            {viewModes.map(({ mode, icon: Icon, label }) => (
              <Tooltip key={mode}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setViewMode(mode)}
                    className={cn(
                      'p-2 rounded-md transition-colors',
                      viewMode === mode
                        ? 'bg-zinc-700 text-white'
                        : 'text-zinc-400 hover:text-white'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {lastSaved && (
            <span className="text-xs text-zinc-500 mr-2">
              Last saved {lastSaved.toLocaleTimeString()}
            </span>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePreviewMode}
                className={cn(
                  'text-zinc-400 hover:text-white',
                  isPreviewMode && 'bg-zinc-800 text-white'
                )}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Preview</TooltipContent>
          </Tooltip>

          <Button
            onClick={onSave}
            disabled={isSaving || !isDirty}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
