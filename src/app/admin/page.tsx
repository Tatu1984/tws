'use client';

import { useRequireAuth } from '@/lib/hooks';
import { usePages, useMedia, useUsers } from '@/lib/hooks';
import { useAuthStore } from '@/lib/stores';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Image,
  Users,
  Plus,
  ArrowRight,
  Clock,
  TrendingUp,
} from 'lucide-react';

export default function AdminDashboard() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { user } = useAuthStore();

  // Only fetch data after authentication is confirmed
  const shouldFetch = !authLoading && isAuthenticated;
  const { data: pages, isLoading: pagesLoading } = usePages(undefined, { enabled: shouldFetch });
  const { data: media, isLoading: mediaLoading } = useMedia(undefined, { enabled: shouldFetch });
  const { data: users, isLoading: usersLoading } = useUsers({ enabled: shouldFetch });

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const publishedPages = pages?.filter((p) => p.status === 'published').length || 0;
  const draftPages = pages?.filter((p) => p.status === 'draft').length || 0;
  const totalMedia = media?.length || 0;
  const totalUsers = users?.length || 0;

  // Get recent pages
  const recentPages = pages
    ?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-zinc-500 mt-1">
          Here&apos;s what&apos;s happening with your website today.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Published Pages
            </CardTitle>
            <FileText className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pagesLoading ? '...' : publishedPages}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              {draftPages} drafts pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Media Files
            </CardTitle>
            <Image className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mediaLoading ? '...' : totalMedia}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Images and documents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Team Members
            </CardTitle>
            <Users className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersLoading ? '...' : totalUsers}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Total Pages
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pagesLoading ? '...' : pages?.length || 0}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Across all statuses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions and recent pages */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your website
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Link href="/admin/pages/new">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create New Page
              </Button>
            </Link>
            <Link href="/admin/media">
              <Button className="w-full justify-start" variant="outline">
                <Image className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            </Link>
            <Link href="/admin/header">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Edit Header
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Site Settings
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Pages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Pages</CardTitle>
              <CardDescription>
                Recently updated pages
              </CardDescription>
            </div>
            <Link href="/admin/pages">
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {pagesLoading ? (
              <div className="text-center py-4 text-zinc-500">Loading...</div>
            ) : recentPages?.length === 0 ? (
              <div className="text-center py-4 text-zinc-500">
                No pages yet.{' '}
                <Link href="/admin/pages/new" className="text-amber-600 hover:underline">
                  Create your first page
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPages?.map((page) => (
                  <Link
                    key={page._id}
                    href={`/admin/pages/${page._id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-zinc-500" />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-900">{page.title}</p>
                        <p className="text-sm text-zinc-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(page.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={page.status === 'published' ? 'default' : 'secondary'}
                      className={
                        page.status === 'published'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : ''
                      }
                    >
                      {page.status}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
