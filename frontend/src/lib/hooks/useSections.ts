'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sectionsApi } from '../api/sections';
import type { Section, CreateSectionData, UpdateSectionData, ContentBlock } from '../types';
import { toast } from 'sonner';

// Query keys
export const sectionKeys = {
  all: ['sections'] as const,
  lists: () => [...sectionKeys.all, 'list'] as const,
  list: (filters?: { type?: 'section' | 'reusable'; isGlobal?: boolean }) =>
    [...sectionKeys.lists(), filters] as const,
  reusable: () => [...sectionKeys.all, 'reusable'] as const,
  global: () => [...sectionKeys.all, 'global'] as const,
  details: () => [...sectionKeys.all, 'detail'] as const,
  detail: (id: string) => [...sectionKeys.details(), id] as const,
};

// Get all sections
export function useSections(filters?: { type?: 'section' | 'reusable'; isGlobal?: boolean }) {
  return useQuery({
    queryKey: sectionKeys.list(filters),
    queryFn: () => sectionsApi.getAll(filters),
  });
}

// Get reusable sections
export function useReusableSections() {
  return useQuery({
    queryKey: sectionKeys.reusable(),
    queryFn: () => sectionsApi.getReusable(),
  });
}

// Get global sections
export function useGlobalSections() {
  return useQuery({
    queryKey: sectionKeys.global(),
    queryFn: () => sectionsApi.getGlobal(),
  });
}

// Get single section
export function useSection(id: string) {
  return useQuery({
    queryKey: sectionKeys.detail(id),
    queryFn: () => sectionsApi.getById(id),
    enabled: !!id,
  });
}

// Create section mutation
export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSectionData) => sectionsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sectionKeys.lists() });
      toast.success('Section created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create section');
    },
  });
}

// Update section mutation
export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSectionData }) =>
      sectionsApi.update(id, data),
    onSuccess: (section) => {
      queryClient.invalidateQueries({ queryKey: sectionKeys.lists() });
      queryClient.setQueryData(sectionKeys.detail(section._id), section);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update section');
    },
  });
}

// Delete section mutation
export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sectionsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sectionKeys.lists() });
      toast.success('Section deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete section');
    },
  });
}

// Add block to section mutation
export function useAddBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sectionId,
      block,
    }: {
      sectionId: string;
      block: Omit<ContentBlock, 'id' | 'order'>;
    }) => sectionsApi.addBlock(sectionId, block),
    onSuccess: (section) => {
      queryClient.setQueryData(sectionKeys.detail(section._id), section);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add block');
    },
  });
}

// Update block mutation
export function useUpdateBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sectionId,
      blockId,
      block,
    }: {
      sectionId: string;
      blockId: string;
      block: Partial<ContentBlock>;
    }) => sectionsApi.updateBlock(sectionId, blockId, block),
    onSuccess: (section) => {
      queryClient.setQueryData(sectionKeys.detail(section._id), section);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update block');
    },
  });
}

// Delete block mutation
export function useDeleteBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, blockId }: { sectionId: string; blockId: string }) =>
      sectionsApi.deleteBlock(sectionId, blockId),
    onSuccess: (section) => {
      queryClient.setQueryData(sectionKeys.detail(section._id), section);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete block');
    },
  });
}

// Reorder blocks mutation
export function useReorderBlocks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, blockIds }: { sectionId: string; blockIds: string[] }) =>
      sectionsApi.reorderBlocks(sectionId, blockIds),
    onSuccess: (section) => {
      queryClient.setQueryData(sectionKeys.detail(section._id), section);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to reorder blocks');
    },
  });
}
