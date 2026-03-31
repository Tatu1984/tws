import { apiClient } from './client';
import type { Media, UpdateMediaData, ApiResponse } from '../types';

export interface MediaListResponse {
  success: boolean;
  data: Media[];
  count: number;
}

export interface MediaResponse {
  success: boolean;
  data: Media;
}

export const mediaApi = {
  // Get all media
  async getAll(params?: {
    folder?: string;
    mimeType?: string;
    tags?: string[];
    page?: number;
    limit?: number;
  }): Promise<Media[]> {
    const response = await apiClient.get<MediaListResponse>('/media', { params });
    return response.data.data ?? [];
  },

  // Get media by ID
  async getById(id: string): Promise<Media> {
    const response = await apiClient.get<MediaResponse>(`/media/${id}`);
    return response.data.data;
  },

  // Upload media file
  async upload(
    file: File,
    options?: {
      alt?: string;
      caption?: string;
      folder?: string;
      tags?: string[];
    },
    onProgress?: (progress: number) => void
  ): Promise<Media> {
    const formData = new FormData();
    formData.append('file', file);
    if (options?.alt) formData.append('alt', options.alt);
    if (options?.caption) formData.append('caption', options.caption);
    if (options?.folder) formData.append('folder', options.folder);
    if (options?.tags) formData.append('tags', JSON.stringify(options.tags));

    const response = await apiClient.post<ApiResponse<Media>>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data.data;
  },

  // Upload multiple files
  async uploadMultiple(
    files: File[],
    options?: {
      folder?: string;
    },
    onProgress?: (progress: number, fileIndex: number) => void
  ): Promise<Media[]> {
    const results: Media[] = [];
    for (let i = 0; i < files.length; i++) {
      const media = await this.upload(files[i], { folder: options?.folder }, (progress) =>
        onProgress?.(progress, i)
      );
      results.push(media);
    }
    return results;
  },

  // Update media metadata
  async update(id: string, data: UpdateMediaData): Promise<Media> {
    const response = await apiClient.put<ApiResponse<Media>>(`/media/${id}`, data);
    return response.data.data;
  },

  // Delete media
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/media/${id}`);
  },

  // Delete multiple media
  async deleteMultiple(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => this.delete(id)));
  },

  // Get folders
  async getFolders(): Promise<string[]> {
    const response = await apiClient.get<{ success: boolean; data: string[] }>('/media/folders');
    return response.data.data;
  },

  // Get images only
  async getImages(params?: { folder?: string }): Promise<Media[]> {
    return this.getAll({ ...params, mimeType: 'image' });
  },
};
