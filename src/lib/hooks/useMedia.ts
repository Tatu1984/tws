'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaApi } from '../api/media';
import type { UpdateMediaData } from '../types';
import { toast } from 'sonner';

// Query keys
export const mediaKeys = {
  all: ['media'] as const,
  lists: () => [...mediaKeys.all, 'list'] as const,
  list: (filters?: { folder?: string; mimeType?: string }) =>
    [...mediaKeys.lists(), filters] as const,
  images: (folder?: string) => [...mediaKeys.all, 'images', folder] as const,
  folders: () => [...mediaKeys.all, 'folders'] as const,
  details: () => [...mediaKeys.all, 'detail'] as const,
  detail: (id: string) => [...mediaKeys.details(), id] as const,
};

// Get all media
export function useMedia(
  filters?: { folder?: string; mimeType?: string },
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: mediaKeys.list(filters),
    queryFn: () => mediaApi.getAll(filters),
    enabled: options?.enabled ?? true,
  });
}

// Get images only
export function useImages(folder?: string) {
  return useQuery({
    queryKey: mediaKeys.images(folder),
    queryFn: () => mediaApi.getImages({ folder }),
  });
}

// Get folders
export function useMediaFolders() {
  return useQuery({
    queryKey: mediaKeys.folders(),
    queryFn: () => mediaApi.getFolders(),
  });
}

// Get single media
export function useMediaItem(id: string) {
  return useQuery({
    queryKey: mediaKeys.detail(id),
    queryFn: () => mediaApi.getById(id),
    enabled: !!id,
  });
}

// Upload media mutation
export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      file,
      options,
      onProgress,
    }: {
      file: File;
      options?: { alt?: string; caption?: string; folder?: string; tags?: string[] };
      onProgress?: (progress: number) => void;
    }) => mediaApi.upload(file, options, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
      queryClient.invalidateQueries({ queryKey: mediaKeys.folders() });
      toast.success('File uploaded successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload file');
    },
  });
}

// Upload multiple files mutation
export function useUploadMultipleMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      files,
      folder,
      onProgress,
    }: {
      files: File[];
      folder?: string;
      onProgress?: (progress: number, fileIndex: number) => void;
    }) => mediaApi.uploadMultiple(files, { folder }, onProgress),
    onSuccess: (media) => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
      queryClient.invalidateQueries({ queryKey: mediaKeys.folders() });
      toast.success(`${media.length} files uploaded successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload files');
    },
  });
}

// Update media mutation
export function useUpdateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMediaData }) =>
      mediaApi.update(id, data),
    onSuccess: (media) => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
      queryClient.setQueryData(mediaKeys.detail(media._id), media);
      toast.success('Media updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update media');
    },
  });
}

// Delete media mutation
export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mediaApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
      toast.success('Media deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete media');
    },
  });
}

// Delete multiple media mutation
export function useDeleteMultipleMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => mediaApi.deleteMultiple(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
      toast.success('Media deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete media');
    },
  });
}
