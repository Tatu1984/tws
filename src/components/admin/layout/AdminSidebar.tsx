'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/lib/stores';
import { useIsAdmin } from '@/lib/hooks';
import {
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  Users,
  PanelTop,
  PanelBottom,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Sections', href: '/admin/sections', icon: Layers },
  { name: 'Header', href: '/admin/header', icon: PanelTop },
  { name: 'Footer', href: '/admin/footer', icon: PanelBottom },
  { name: 'Media', href: '/admin/media', icon: Image },
];

const adminNavigation = [
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Users', href: '/admin/users', icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const isAdmin = useIsAdmin();
  const { isSidebarCollapsed, setSidebarCollapsed } = useUIStore();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-zinc-900 border-r border-zinc-800 transition-all duration-300',
        isSidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-800">
        {!isSidebarCollapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
              TS
            </div>
            <span className="font-semibold text-white">TSW Admin</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                )}
                title={isSidebarCollapsed ? item.name : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isSidebarCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* Admin only section */}
        {isAdmin && (
          <>
            <div className="my-3 border-t border-zinc-800" />
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <span className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Admin
                </span>
              )}
              {adminNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    )}
                    title={isSidebarCollapsed ? item.name : undefined}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!isSidebarCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </nav>

      {/* View Site Link */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-zinc-800">
        <Link
          href="/"
          target="_blank"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors',
            isSidebarCollapsed && 'justify-center'
          )}
          title={isSidebarCollapsed ? 'View Site' : undefined}
        >
          <svg
            className="h-5 w-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          {!isSidebarCollapsed && <span>View Site</span>}
        </Link>
      </div>
    </aside>
  );
}
