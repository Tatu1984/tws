'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore, useUIStore } from '@/lib/stores';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu, LogOut, User, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminTopbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { isSidebarCollapsed, toggleMobileMenu } = useUIStore();

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 h-16 bg-white border-b border-zinc-200 transition-all duration-300',
        isSidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Right side - Notifications and User menu */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-zinc-200 text-zinc-700 text-sm">
                    {user?.name ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">{user?.name || 'User'}</span>
                  <span className="text-xs text-zinc-500 capitalize">{user?.role || 'User'}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.name}</span>
                  <span className="text-xs font-normal text-zinc-500">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/admin/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
