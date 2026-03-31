import { apiClient } from './client';
import type { User, UserRole, ApiResponse } from '../types';

export interface UsersListResponse {
  success: boolean;
  data: User[];
  count: number;
}

export interface UserResponse {
  success: boolean;
  data: User;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  role?: UserRole;
  isActive?: boolean;
  password?: string;
}

export const usersApi = {
  // Get all users (admin only)
  async getAll(): Promise<User[]> {
    const response = await apiClient.get<UsersListResponse>('/users');
    return response.data.data ?? [];
  },

  // Get user by ID
  async getById(id: string): Promise<User> {
    const response = await apiClient.get<UserResponse>(`/users/${id}`);
    return response.data.data;
  },

  // Create user (admin only)
  async create(data: CreateUserData): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>('/users', data);
    return response.data.data;
  },

  // Update user
  async update(id: string, data: UpdateUserData): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
  },

  // Delete user (admin only)
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },

  // Toggle user active status
  async toggleActive(id: string, isActive: boolean): Promise<User> {
    return this.update(id, { isActive });
  },

  // Change user role
  async changeRole(id: string, role: UserRole): Promise<User> {
    return this.update(id, { role });
  },
};
