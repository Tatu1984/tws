'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { headersApi } from '../api/headers';
import type { CreateHeaderData, UpdateHeaderData } from '../types';
import { toast } from 'sonner';

// Query keys
export const headerKeys = {
  all: ['headers'] as const,
  lists: () => [...headerKeys.all, 'list'] as const,
  default: () => [...headerKeys.all, 'default'] as const,
  details: () => [...headerKeys.all, 'detail'] as const,
  detail: (id: string) => [...headerKeys.details(), id] as const,
};

// Get all headers
export function useHeaders() {
  return useQuery({
    queryKey: headerKeys.lists(),
    queryFn: () => headersApi.getAll(),
  });
}

// Get default header
export function useDefaultHeader() {
  return useQuery({
    queryKey: headerKeys.default(),
    queryFn: () => headersApi.getDefault(),
  });
}

// Get single header
export function useHeader(id: string) {
  return useQuery({
    queryKey: headerKeys.detail(id),
    queryFn: () => headersApi.getById(id),
    enabled: !!id,
  });
}

// Create header mutation
export function useCreateHeader() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateHeaderData) => headersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: headerKeys.lists() });
      toast.success('Header created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create header');
    },
  });
}

// Update header mutation
export function useUpdateHeader() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateHeaderData }) =>
      headersApi.update(id, data),
    onSuccess: (header) => {
      queryClient.invalidateQueries({ queryKey: headerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: headerKeys.default() });
      queryClient.setQueryData(headerKeys.detail(header._id), header);
      toast.success('Header updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update header');
    },
  });
}

// Delete header mutation
export function useDeleteHeader() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => headersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: headerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: headerKeys.default() });
      toast.success('Header deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete header');
    },
  });
}

// Set default header mutation
export function useSetDefaultHeader() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => headersApi.setDefault(id),
    onSuccess: (header) => {
      queryClient.invalidateQueries({ queryKey: headerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: headerKeys.default() });
      queryClient.setQueryData(headerKeys.detail(header._id), header);
      toast.success('Default header updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to set default header');
    },
  });
}
