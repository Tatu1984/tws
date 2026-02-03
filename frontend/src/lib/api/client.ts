import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

// Token storage key
const TOKEN_KEY = 'tsw_auth_token';

// Get token from storage
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

// Set token in storage
export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
};

// Remove token from storage
export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
};

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - just remove token, let React hooks handle navigation
    if (error.response?.status === 401) {
      removeToken();
      // Clear zustand persist storage to prevent stale auth state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('tsw-auth');
      }
    }
    return Promise.reject(error);
  }
);

// Helper to extract error message from API response
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: Record<string, string[]> };
    if (data?.message) return data.message;
    if (data?.errors) {
      const firstError = Object.values(data.errors)[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        return firstError[0];
      }
    }
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
};
