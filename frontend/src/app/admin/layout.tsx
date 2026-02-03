'use client';

import { usePathname } from 'next/navigation';
import { QueryProvider } from '@/components/providers';
import { AdminSidebar, AdminTopbar } from '@/components/admin/layout';
import { useAuthInit } from '@/lib/hooks';
import { useUIStore } from '@/lib/stores';
import { cn } from '@/lib/utils';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoading } = useAuthInit();
  const { isSidebarCollapsed } = useUIStore();

  // Check if we're on the login page
  const isLoginPage = pathname === '/admin/login';

  // Check if we're in the builder (full screen mode)
  const isBuilderPage = pathname.includes('/builder');

  // Loading state
  if (isLoading && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg animate-pulse">
            TS
          </div>
          <p className="text-zinc-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Login page - no sidebar/topbar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Builder page - minimal UI
  if (isBuilderPage) {
    return <>{children}</>;
  }

  // Regular admin pages with sidebar and topbar
  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminSidebar />
      <AdminTopbar />
      <main
        className={cn(
          'min-h-screen pt-16 transition-all duration-300',
          isSidebarCollapsed ? 'pl-16' : 'pl-64'
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </QueryProvider>
  );
}
