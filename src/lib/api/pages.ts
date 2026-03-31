import { apiClient } from './client';
import type {
  Page,
  PageWithPopulatedSections,
  CreatePageData,
  UpdatePageData,
  ApiResponse,
  Section,
} from '../types';

export interface PagesListResponse {
  success: boolean;
  data: Page[];
  count: number;
}

export interface PageResponse {
  success: boolean;
  data: PageWithPopulatedSections;
}

export const pagesApi = {
  // Get all pages
  async getAll(params?: {
    status?: string;
    showInNavigation?: boolean;
  }): Promise<Page[]> {
    const response = await apiClient.get<PagesListResponse>('/pages', { params });
    return response.data.data ?? [];
  },

  // Get page by ID or slug
  async getById(id: string): Promise<PageWithPopulatedSections> {
    const response = await apiClient.get<PageResponse>(`/pages/${id}`);
    return response.data.data;
  },

  // Create page
  async create(data: CreatePageData): Promise<Page> {
    const response = await apiClient.post<ApiResponse<Page>>('/pages', data);
    return response.data.data;
  },

  // Update page
  async update(id: string, data: UpdatePageData): Promise<Page> {
    const response = await apiClient.put<ApiResponse<Page>>(`/pages/${id}`, data);
    return response.data.data;
  },

  // Delete page
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/pages/${id}`);
  },

  // Add section to page
  async addSection(pageId: string, sectionData: { name: string; blocks?: unknown[] }): Promise<Section> {
    const response = await apiClient.post<ApiResponse<Section>>(`/pages/${pageId}/sections`, sectionData);
    return response.data.data;
  },

  // Remove section from page
  async removeSection(pageId: string, sectionId: string): Promise<void> {
    await apiClient.delete(`/pages/${pageId}/sections/${sectionId}`);
  },

  // Reorder sections
  async reorderSections(pageId: string, sectionIds: string[]): Promise<Page> {
    const response = await apiClient.put<ApiResponse<Page>>(`/pages/${pageId}/sections/reorder`, {
      sectionIds,
    });
    return response.data.data;
  },

  // Duplicate page
  async duplicate(id: string): Promise<Page> {
    const response = await apiClient.post<ApiResponse<Page>>(`/pages/${id}/duplicate`);
    return response.data.data;
  },

  // Publish page
  async publish(id: string): Promise<Page> {
    return this.update(id, { status: 'published' });
  },

  // Unpublish page (set to draft)
  async unpublish(id: string): Promise<Page> {
    return this.update(id, { status: 'draft' });
  },

  // Archive page
  async archive(id: string): Promise<Page> {
    return this.update(id, { status: 'archived' });
  },
};
