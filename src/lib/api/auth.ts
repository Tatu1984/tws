import { apiClient, setToken, removeToken } from './client';
import type { AuthResponse, LoginCredentials, User } from '../types';

export const authApi = {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      setToken(response.data.token);
    }
    return response.data;
  },

  // Register user (admin only in production)
  async register(data: { email: string; password: string; name: string; role?: string }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{ success: boolean; user: User }>('/auth/me');
    return response.data.user;
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      removeToken();
    }
  },

  // Check if user is authenticated
  async checkAuth(): Promise<User | null> {
    try {
      return await this.getCurrentUser();
    } catch {
      return null;
    }
  },
};
