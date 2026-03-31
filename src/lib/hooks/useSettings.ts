'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '../api/settings';
import type { UpdateSiteSettingsData } from '../types';
import { toast } from 'sonner';

// Query keys
export const settingsKeys = {
  all: ['settings'] as const,
  site: () => [...settingsKeys.all, 'site'] as const,
};

// Get site settings
export function useSiteSettings() {
  return useQuery({
    queryKey: settingsKeys.site(),
    queryFn: () => settingsApi.get(),
  });
}

// Update site settings mutation
export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSiteSettingsData) => settingsApi.update(data),
    onSuccess: (settings) => {
      queryClient.setQueryData(settingsKeys.site(), settings);
      toast.success('Settings updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update settings');
    },
  });
}

// Update specific section of settings
export function useUpdateSettingsSection<K extends keyof UpdateSiteSettingsData>() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ section, data }: { section: K; data: UpdateSiteSettingsData[K] }) =>
      settingsApi.updateSection(section, data),
    onSuccess: (settings) => {
      queryClient.setQueryData(settingsKeys.site(), settings);
      toast.success('Settings updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update settings');
    },
  });
}
