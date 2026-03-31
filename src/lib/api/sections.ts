import { apiClient } from './client';
import type {
  Section,
  CreateSectionData,
  UpdateSectionData,
  ApiResponse,
  ContentBlock,
} from '../types';

export interface SectionsListResponse {
  success: boolean;
  data: Section[];
  count: number;
}

export interface SectionResponse {
  success: boolean;
  data: Section;
}

export const sectionsApi = {
  // Get all sections
  async getAll(params?: {
    type?: 'section' | 'reusable';
    isGlobal?: boolean;
  }): Promise<Section[]> {
    const response = await apiClient.get<SectionsListResponse>('/sections', { params });
    return response.data.data;
  },

  // Get section by ID
  async getById(id: string): Promise<Section> {
    const response = await apiClient.get<SectionResponse>(`/sections/${id}`);
    return response.data.data;
  },

  // Create section
  async create(data: CreateSectionData): Promise<Section> {
    const response = await apiClient.post<ApiResponse<Section>>('/sections', data);
    return response.data.data;
  },

  // Update section
  async update(id: string, data: UpdateSectionData): Promise<Section> {
    const response = await apiClient.put<ApiResponse<Section>>(`/sections/${id}`, data);
    return response.data.data;
  },

  // Delete section
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/sections/${id}`);
  },

  // Add block to section
  async addBlock(sectionId: string, block: Omit<ContentBlock, 'id' | 'order'>): Promise<Section> {
    const response = await apiClient.post<ApiResponse<Section>>(
      `/sections/${sectionId}/blocks`,
      block
    );
    return response.data.data;
  },

  // Update block in section
  async updateBlock(
    sectionId: string,
    blockId: string,
    block: Partial<ContentBlock>
  ): Promise<Section> {
    const response = await apiClient.put<ApiResponse<Section>>(
      `/sections/${sectionId}/blocks/${blockId}`,
      block
    );
    return response.data.data;
  },

  // Delete block from section
  async deleteBlock(sectionId: string, blockId: string): Promise<Section> {
    const response = await apiClient.delete<ApiResponse<Section>>(
      `/sections/${sectionId}/blocks/${blockId}`
    );
    return response.data.data;
  },

  // Reorder blocks in section
  async reorderBlocks(sectionId: string, blockIds: string[]): Promise<Section> {
    const response = await apiClient.put<ApiResponse<Section>>(
      `/sections/${sectionId}/blocks/reorder`,
      { blockIds }
    );
    return response.data.data;
  },

  // Get reusable sections (for insertion in pages)
  async getReusable(): Promise<Section[]> {
    return this.getAll({ type: 'reusable' });
  },

  // Get global sections
  async getGlobal(): Promise<Section[]> {
    return this.getAll({ isGlobal: true });
  },
};
