'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../stores/auth';

// Hook to initialize auth check on mount
export function useAuthInit() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    if (isHydrated && !hasCheckedAuth) {
      checkAuth();
    }
  }, [isHydrated, hasCheckedAuth, checkAuth]);

  return { isLoading };
}

// Hook to protect routes - redirects to login if not authenticated
export function useRequireAuth(redirectTo = '/admin/login') {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const hasRedirected = useRef(false);

  useEffect(() => {
    hasRedirected.current = false;
  }, [pathname]);

  useEffect(() => {
    if (isHydrated && !hasCheckedAuth) {
      checkAuth();
    }
  }, [isHydrated, hasCheckedAuth, checkAuth]);

  useEffect(() => {
    if (isHydrated && hasCheckedAuth && !isLoading && !isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, isHydrated, hasCheckedAuth, router, redirectTo]);

  return { isAuthenticated, isLoading: !isHydrated || !hasCheckedAuth || isLoading };
}

// Hook to redirect authenticated users away from login page
export function useRedirectIfAuthenticated(redirectTo = '/admin') {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const hasRedirected = useRef(false);

  useEffect(() => {
    hasRedirected.current = false;
  }, [pathname]);

  useEffect(() => {
    if (isHydrated && !hasCheckedAuth) {
      checkAuth();
    }
  }, [isHydrated, hasCheckedAuth, checkAuth]);

  useEffect(() => {
    if (isHydrated && hasCheckedAuth && !isLoading && isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, isHydrated, hasCheckedAuth, router, redirectTo]);

  return { isAuthenticated, isLoading: !isHydrated || !hasCheckedAuth || isLoading };
}

// Re-export store hooks
export { useAuthStore, useHasRole, useIsAdmin, useCanEdit } from '../stores/auth';
