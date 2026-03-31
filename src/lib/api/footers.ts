import { apiClient } from './client';
import type { Footer, CreateFooterData, UpdateFooterData, ApiResponse } from '../types';

export interface FootersListResponse {
  success: boolean;
  data: Footer[];
  count: number;
}

export interface FooterResponse {
  success: boolean;
  data: Footer;
}

export const footersApi = {
  // Get all footers
  async getAll(): Promise<Footer[]> {
    const response = await apiClient.get<FootersListResponse>('/footers');
    return response.data.data;
  },

  // Get footer by ID
  async getById(id: string): Promise<Footer> {
    const response = await apiClient.get<FooterResponse>(`/footers/${id}`);
    return response.data.data;
  },

  // Get default footer
  async getDefault(): Promise<Footer | null> {
    const footers = await this.getAll();
    return footers.find((f) => f.isDefault) || footers[0] || null;
  },

  // Create footer
  async create(data: CreateFooterData): Promise<Footer> {
    const response = await apiClient.post<ApiResponse<Footer>>('/footers', data);
    return response.data.data;
  },

  // Update footer
  async update(id: string, data: UpdateFooterData): Promise<Footer> {
    const response = await apiClient.put<ApiResponse<Footer>>(`/footers/${id}`, data);
    return response.data.data;
  },

  // Delete footer
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/footers/${id}`);
  },

  // Set as default
  async setDefault(id: string): Promise<Footer> {
    return this.update(id, { isDefault: true });
  },
};
