import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { authApi } from '../api/auth';
import { getToken, removeToken } from '../api/client';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  hasCheckedAuth: boolean;
  error: string | null;
  _checkAuthPromise: Promise<void> | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      isHydrated: false,
      hasCheckedAuth: false,
      error: null,
      _checkAuthPromise: null,

      setHydrated: () => {
        set({ isHydrated: true });
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login({ email, password });
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : 'Login failed. Please try again.';
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: message,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch {
          // Ignore logout errors
        } finally {
          removeToken();
          // Clear zustand persist storage to prevent stale state on next load
          if (typeof window !== 'undefined') {
            localStorage.removeItem('tsw-auth');
          }
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            hasCheckedAuth: false,
            error: null,
          });
        }
      },

      checkAuth: async () => {
        // Skip if already checked auth in this session
        if (get().hasCheckedAuth) {
          return;
        }

        // Prevent concurrent checkAuth calls
        const existing = get()._checkAuthPromise;
        if (existing) {
          return existing;
        }

        const token = getToken();
        if (!token) {
          set({ user: null, isAuthenticated: false, isLoading: false, hasCheckedAuth: true });
          return;
        }

        const promise = (async () => {
          set({ isLoading: true });
          try {
            const user = await authApi.getCurrentUser();
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              hasCheckedAuth: true,
            });
          } catch {
            removeToken();
            // Clear zustand persist storage to prevent stale state
            if (typeof window !== 'undefined') {
              localStorage.removeItem('tsw-auth');
            }
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              hasCheckedAuth: true,
            });
          } finally {
            set({ _checkAuthPromise: null });
          }
        })();

        set({ _checkAuthPromise: promise });
        return promise;
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'tsw-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

// Helper hook to check if user has specific role
export const useHasRole = (roles: ('admin' | 'editor' | 'viewer')[]) => {
  const user = useAuthStore((state) => state.user);
  return user ? roles.includes(user.role) : false;
};

// Helper hook to check if user is admin
export const useIsAdmin = () => useHasRole(['admin']);

// Helper hook to check if user can edit (admin or editor)
export const useCanEdit = () => useHasRole(['admin', 'editor']);
