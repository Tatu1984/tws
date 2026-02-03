'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { footersApi } from '../api/footers';
import type { CreateFooterData, UpdateFooterData } from '../types';
import { toast } from 'sonner';

// Query keys
export const footerKeys = {
  all: ['footers'] as const,
  lists: () => [...footerKeys.all, 'list'] as const,
  default: () => [...footerKeys.all, 'default'] as const,
  details: () => [...footerKeys.all, 'detail'] as const,
  detail: (id: string) => [...footerKeys.details(), id] as const,
};

// Get all footers
export function useFooters() {
  return useQuery({
    queryKey: footerKeys.lists(),
    queryFn: () => footersApi.getAll(),
  });
}

// Get default footer
export function useDefaultFooter() {
  return useQuery({
    queryKey: footerKeys.default(),
    queryFn: () => footersApi.getDefault(),
  });
}

// Get single footer
export function useFooter(id: string) {
  return useQuery({
    queryKey: footerKeys.detail(id),
    queryFn: () => footersApi.getById(id),
    enabled: !!id,
  });
}

// Create footer mutation
export function useCreateFooter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFooterData) => footersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: footerKeys.lists() });
      toast.success('Footer created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create footer');
    },
  });
}

// Update footer mutation
export function useUpdateFooter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFooterData }) =>
      footersApi.update(id, data),
    onSuccess: (footer) => {
      queryClient.invalidateQueries({ queryKey: footerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: footerKeys.default() });
      queryClient.setQueryData(footerKeys.detail(footer._id), footer);
      toast.success('Footer updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update footer');
    },
  });
}

// Delete footer mutation
export function useDeleteFooter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => footersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: footerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: footerKeys.default() });
      toast.success('Footer deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete footer');
    },
  });
}

// Set default footer mutation
export function useSetDefaultFooter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => footersApi.setDefault(id),
    onSuccess: (footer) => {
      queryClient.invalidateQueries({ queryKey: footerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: footerKeys.default() });
      queryClient.setQueryData(footerKeys.detail(footer._id), footer);
      toast.success('Default footer updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to set default footer');
    },
  });
}
