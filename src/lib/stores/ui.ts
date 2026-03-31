import { create } from 'zustand';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface Modal {
  id: string;
  component: React.ComponentType<{ onClose: () => void; data?: unknown }>;
  data?: unknown;
}

interface UIState {
  // Sidebar
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;

  // Mobile menu
  isMobileMenuOpen: boolean;

  // Modals
  modals: Modal[];

  // Loading states
  globalLoading: boolean;
  loadingMessage: string | null;

  // Toasts (for non-sonner fallback)
  toasts: Toast[];

  // Media picker
  isMediaPickerOpen: boolean;
  mediaPickerCallback: ((url: string) => void) | null;

  // Confirmation dialog
  confirmDialog: {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    onConfirm?: () => void;
    onCancel?: () => void;
  } | null;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSidebarCollapsed: (isCollapsed: boolean) => void;

  toggleMobileMenu: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;

  openModal: (modal: Omit<Modal, 'id'>) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;

  setGlobalLoading: (loading: boolean, message?: string) => void;

  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;

  openMediaPicker: (callback: (url: string) => void) => void;
  closeMediaPicker: () => void;

  openConfirmDialog: (options: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => void;
  closeConfirmDialog: () => void;
}

let toastId = 0;
let modalId = 0;

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  isSidebarOpen: true,
  isSidebarCollapsed: false,
  isMobileMenuOpen: false,
  modals: [],
  globalLoading: false,
  loadingMessage: null,
  toasts: [],
  isMediaPickerOpen: false,
  mediaPickerCallback: null,
  confirmDialog: null,

  // Sidebar actions
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setSidebarCollapsed: (isCollapsed) => set({ isSidebarCollapsed: isCollapsed }),

  // Mobile menu actions
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),

  // Modal actions
  openModal: (modal) => {
    const id = `modal-${++modalId}`;
    set((state) => ({
      modals: [...state.modals, { ...modal, id }],
    }));
    return id;
  },
  closeModal: (id) => {
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id),
    }));
  },
  closeAllModals: () => set({ modals: [] }),

  // Loading actions
  setGlobalLoading: (loading, message) => {
    set({ globalLoading: loading, loadingMessage: message || null });
  },

  // Toast actions
  addToast: (toast) => {
    const id = `toast-${++toastId}`;
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    // Auto remove after duration
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }

    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  // Media picker actions
  openMediaPicker: (callback) => {
    set({ isMediaPickerOpen: true, mediaPickerCallback: callback });
  },
  closeMediaPicker: () => {
    set({ isMediaPickerOpen: false, mediaPickerCallback: null });
  },

  // Confirm dialog actions
  openConfirmDialog: (options) => {
    set({
      confirmDialog: {
        isOpen: true,
        ...options,
      },
    });
  },
  closeConfirmDialog: () => {
    set({ confirmDialog: null });
  },
}));

// Helper function to show confirm dialog as promise
export const confirm = (options: {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}): Promise<boolean> => {
  return new Promise((resolve) => {
    useUIStore.getState().openConfirmDialog({
      ...options,
      onConfirm: () => {
        useUIStore.getState().closeConfirmDialog();
        resolve(true);
      },
      onCancel: () => {
        useUIStore.getState().closeConfirmDialog();
        resolve(false);
      },
    });
  });
};
