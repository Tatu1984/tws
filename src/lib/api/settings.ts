import { apiClient } from './client';
import type { SiteSettings, UpdateSiteSettingsData, ApiResponse } from '../types';

export interface SettingsResponse {
  success: boolean;
  data: SiteSettings;
}

export const settingsApi = {
  // Get site settings
  async get(): Promise<SiteSettings> {
    const response = await apiClient.get<SettingsResponse>('/settings');
    return response.data.data;
  },

  // Update site settings
  async update(data: UpdateSiteSettingsData): Promise<SiteSettings> {
    const response = await apiClient.put<ApiResponse<SiteSettings>>('/settings', data);
    return response.data.data;
  },

  // Update specific settings section
  async updateSection<K extends keyof UpdateSiteSettingsData>(
    section: K,
    data: UpdateSiteSettingsData[K]
  ): Promise<SiteSettings> {
    return this.update({ [section]: data } as UpdateSiteSettingsData);
  },
};
