'use client';

import { useState, useCallback } from 'react';
import { useRequireAuth } from '@/lib/hooks';
import { useMedia, useUploadMedia, useDeleteMedia, useDeleteMultipleMedia } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import {
  Upload,
  Search,
  Trash,
  Image as ImageIcon,
  FileText,
  Film,
  Loader2,
  X,
  Check,
  Grid,
  List,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Media } from '@/lib/types';

export default function MediaLibraryPage() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const shouldFetch = !authLoading && isAuthenticated;
  const { data: media, isLoading } = useMedia(undefined, { enabled: shouldFetch });
  const uploadMedia = useUploadMedia();
  const deleteMedia = useDeleteMedia();
  const deleteMultipleMedia = useDeleteMultipleMedia();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Media | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  // Filter media
  const filteredMedia = media?.filter(
    (item) =>
      item.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      await uploadMedia.mutateAsync({
        file: files[i],
        onProgress: setUploadProgress,
      });
    }
    setUploadProgress(0);
    setUploadDialogOpen(false);
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    await handleFileSelect(files);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedMedia);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedMedia(newSelected);
  };

  const handleDeleteSelected = async () => {
    await deleteMultipleMedia.mutateAsync(Array.from(selectedMedia));
    setSelectedMedia(new Set());
    setDeleteDialogOpen(false);
  };

  const getMediaIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return ImageIcon;
    if (mimeType.startsWith('video/')) return Film;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div
      className="space-y-6"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* Drag overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-50 bg-amber-500/20 flex items-center justify-center border-4 border-dashed border-amber-500">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <Upload className="h-12 w-12 mx-auto text-amber-500 mb-4" />
            <p className="text-lg font-medium">Drop files to upload</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Media Library</h1>
          <p className="text-zinc-500 mt-1">
            Upload and manage your images and files
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedMedia.size > 0 && (
            <Button
              variant="outline"
              className="text-red-600"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete ({selectedMedia.size})
            </Button>
          )}
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-1 border border-zinc-200 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-2 rounded',
              viewMode === 'grid' ? 'bg-zinc-100' : 'hover:bg-zinc-50'
            )}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-2 rounded',
              viewMode === 'list' ? 'bg-zinc-100' : 'hover:bg-zinc-50'
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Media grid/list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        </div>
      ) : filteredMedia?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Upload className="h-12 w-12 mx-auto text-zinc-300 mb-4" />
            <h3 className="text-lg font-medium text-zinc-900">No media files</h3>
            <p className="text-zinc-500 mt-1 mb-4">
              {searchQuery ? 'No files match your search' : 'Upload your first file to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setUploadDialogOpen(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia?.map((item) => {
            const isSelected = selectedMedia.has(item._id);
            const Icon = getMediaIcon(item.mimeType);

            return (
              <div
                key={item._id}
                className={cn(
                  'relative group aspect-square bg-zinc-100 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer',
                  isSelected ? 'border-amber-500' : 'border-transparent hover:border-zinc-300'
                )}
                onClick={() => {
                  setSelectedItem(item);
                  setDetailDialogOpen(true);
                }}
              >
                {item.mimeType.startsWith('image/') ? (
                  <img
                    src={item.url}
                    alt={item.alt || item.originalName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="h-12 w-12 text-zinc-400" />
                  </div>
                )}

                {/* Selection checkbox */}
                <button
                  className={cn(
                    'absolute top-2 left-2 w-6 h-6 rounded border-2 flex items-center justify-center transition-all',
                    isSelected
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'bg-white border-zinc-300 opacity-0 group-hover:opacity-100'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSelect(item._id);
                  }}
                >
                  {isSelected && <Check className="h-4 w-4" />}
                </button>

                {/* File name overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-xs text-white truncate">{item.originalName}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-zinc-200 divide-y">
          {filteredMedia?.map((item) => {
            const isSelected = selectedMedia.has(item._id);
            const Icon = getMediaIcon(item.mimeType);

            return (
              <div
                key={item._id}
                className={cn(
                  'flex items-center gap-4 p-4 hover:bg-zinc-50 cursor-pointer',
                  isSelected && 'bg-amber-50'
                )}
                onClick={() => {
                  setSelectedItem(item);
                  setDetailDialogOpen(true);
                }}
              >
                <button
                  className={cn(
                    'w-6 h-6 rounded border-2 flex items-center justify-center shrink-0',
                    isSelected
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-zinc-300'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSelect(item._id);
                  }}
                >
                  {isSelected && <Check className="h-4 w-4" />}
                </button>

                <div className="w-12 h-12 bg-zinc-100 rounded overflow-hidden shrink-0">
                  {item.mimeType.startsWith('image/') ? (
                    <img
                      src={item.url}
                      alt={item.alt || item.originalName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-zinc-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.originalName}</p>
                  <p className="text-sm text-zinc-500">
                    {formatFileSize(item.size)} • {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Drag and drop files here or click to browse
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <label className="block">
              <div className="border-2 border-dashed border-zinc-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-zinc-400 mb-2" />
                <p className="text-sm text-zinc-600">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  PNG, JPG, GIF, PDF up to 10MB
                </p>
              </div>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </label>

            {uploadMedia.isPending && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Media detail dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Media Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="aspect-square bg-zinc-100 rounded-lg overflow-hidden">
                {selectedItem.mimeType.startsWith('image/') ? (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.alt || selectedItem.originalName}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {(() => {
                      const Icon = getMediaIcon(selectedItem.mimeType);
                      return <Icon className="h-24 w-24 text-zinc-400" />;
                    })()}
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-zinc-500">File Name</Label>
                  <p className="font-medium">{selectedItem.originalName}</p>
                </div>
                <div>
                  <Label className="text-zinc-500">URL</Label>
                  <Input value={selectedItem.url} readOnly className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-zinc-500">Size</Label>
                    <p>{formatFileSize(selectedItem.size)}</p>
                  </div>
                  <div>
                    <Label className="text-zinc-500">Type</Label>
                    <p>{selectedItem.mimeType}</p>
                  </div>
                </div>
                {selectedItem.width && selectedItem.height && (
                  <div>
                    <Label className="text-zinc-500">Dimensions</Label>
                    <p>{selectedItem.width} x {selectedItem.height}</p>
                  </div>
                )}
                <div>
                  <Label className="text-zinc-500">Uploaded</Label>
                  <p>{new Date(selectedItem.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigator.clipboard.writeText(selectedItem.url)}
                  >
                    Copy URL
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600"
                    onClick={async () => {
                      await deleteMedia.mutateAsync(selectedItem._id);
                      setDetailDialogOpen(false);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Media</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedMedia.size} file(s)? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSelected}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
