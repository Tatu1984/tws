import { apiClient } from './client';
import type { Header, CreateHeaderData, UpdateHeaderData, ApiResponse } from '../types';

export interface HeadersListResponse {
  success: boolean;
  data: Header[];
  count: number;
}

export interface HeaderResponse {
  success: boolean;
  data: Header;
}

export const headersApi = {
  // Get all headers
  async getAll(): Promise<Header[]> {
    const response = await apiClient.get<HeadersListResponse>('/headers');
    return response.data.data;
  },

  // Get header by ID
  async getById(id: string): Promise<Header> {
    const response = await apiClient.get<HeaderResponse>(`/headers/${id}`);
    return response.data.data;
  },

  // Get default header
  async getDefault(): Promise<Header | null> {
    const headers = await this.getAll();
    return headers.find((h) => h.isDefault) || headers[0] || null;
  },

  // Create header
  async create(data: CreateHeaderData): Promise<Header> {
    const response = await apiClient.post<ApiResponse<Header>>('/headers', data);
    return response.data.data;
  },

  // Update header
  async update(id: string, data: UpdateHeaderData): Promise<Header> {
    const response = await apiClient.put<ApiResponse<Header>>(`/headers/${id}`, data);
    return response.data.data;
  },

  // Delete header
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/headers/${id}`);
  },

  // Set as default
  async setDefault(id: string): Promise<Header> {
    return this.update(id, { isDefault: true });
  },
};
