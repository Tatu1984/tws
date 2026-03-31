'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pagesApi } from '../api/pages';
import type { Page, CreatePageData, UpdatePageData } from '../types';
import { toast } from 'sonner';

// Query keys
export const pageKeys = {
  all: ['pages'] as const,
  lists: () => [...pageKeys.all, 'list'] as const,
  list: (filters?: { status?: string; showInNavigation?: boolean }) =>
    [...pageKeys.lists(), filters] as const,
  details: () => [...pageKeys.all, 'detail'] as const,
  detail: (id: string) => [...pageKeys.details(), id] as const,
};

// Get all pages
export function usePages(
  filters?: { status?: string; showInNavigation?: boolean },
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: pageKeys.list(filters),
    queryFn: () => pagesApi.getAll(filters),
    enabled: options?.enabled ?? true,
  });
}

// Get single page
export function usePage(id: string) {
  return useQuery({
    queryKey: pageKeys.detail(id),
    queryFn: () => pagesApi.getById(id),
    enabled: !!id,
  });
}

// Create page mutation
export function useCreatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePageData) => pagesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageKeys.lists() });
      toast.success('Page created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create page');
    },
  });
}

// Update page mutation
export function useUpdatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePageData }) =>
      pagesApi.update(id, data),
    onSuccess: (page) => {
      queryClient.invalidateQueries({ queryKey: pageKeys.lists() });
      queryClient.setQueryData(pageKeys.detail(page._id), page);
      toast.success('Page updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update page');
    },
  });
}

// Delete page mutation
export function useDeletePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pagesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageKeys.lists() });
      toast.success('Page deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete page');
    },
  });
}

// Duplicate page mutation
export function useDuplicatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pagesApi.duplicate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageKeys.lists() });
      toast.success('Page duplicated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to duplicate page');
    },
  });
}

// Publish page mutation
export function usePublishPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pagesApi.publish(id),
    onSuccess: (page) => {
      queryClient.invalidateQueries({ queryKey: pageKeys.lists() });
      queryClient.setQueryData(pageKeys.detail(page._id), page);
      toast.success('Page published successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to publish page');
    },
  });
}

// Unpublish page mutation
export function useUnpublishPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pagesApi.unpublish(id),
    onSuccess: (page) => {
      queryClient.invalidateQueries({ queryKey: pageKeys.lists() });
      queryClient.setQueryData(pageKeys.detail(page._id), page);
      toast.success('Page unpublished');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to unpublish page');
    },
  });
}

// Reorder sections mutation
export function useReorderSections() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pageId, sectionIds }: { pageId: string; sectionIds: string[] }) =>
      pagesApi.reorderSections(pageId, sectionIds),
    onSuccess: (page) => {
      queryClient.setQueryData(pageKeys.detail(page._id), page);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to reorder sections');
    },
  });
}

// Add section to page mutation
export function useAddSectionToPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pageId, sectionData }: { pageId: string; sectionData: { name: string; blocks?: unknown[] } }) =>
      pagesApi.addSection(pageId, sectionData),
    onSuccess: (_, { pageId }) => {
      queryClient.invalidateQueries({ queryKey: pageKeys.detail(pageId) });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add section');
    },
  });
}

// Remove section from page mutation
export function useRemoveSectionFromPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pageId, sectionId }: { pageId: string; sectionId: string }) =>
      pagesApi.removeSection(pageId, sectionId),
    onSuccess: (_, { pageId }) => {
      queryClient.invalidateQueries({ queryKey: pageKeys.detail(pageId) });
      toast.success('Section removed');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove section');
    },
  });
}
