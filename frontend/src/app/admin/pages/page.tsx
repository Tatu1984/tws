'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '@/lib/hooks';
import { usePages, useDeletePage, useDuplicatePage, usePublishPage, useUnpublishPage } from '@/lib/hooks';
import { useIsAdmin } from '@/lib/stores';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash,
  Copy,
  Eye,
  Globe,
  FileText,
  Home,
  Layers,
} from 'lucide-react';
import type { Page } from '@/lib/types';

export default function PagesPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const isAdmin = useIsAdmin();
  const shouldFetch = !authLoading && isAuthenticated;
  const { data: pages, isLoading } = usePages(undefined, { enabled: shouldFetch });
  const deletePage = useDeletePage();
  const duplicatePage = useDuplicatePage();
  const publishPage = usePublishPage();
  const unpublishPage = useUnpublishPage();

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  // Filter pages based on search
  const filteredPages = pages?.filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (page: Page) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (pageToDelete) {
      await deletePage.mutateAsync(pageToDelete._id);
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    await duplicatePage.mutateAsync(id);
  };

  const handleTogglePublish = async (page: Page) => {
    if (page.status === 'published') {
      await unpublishPage.mutateAsync(page._id);
    } else {
      await publishPage.mutateAsync(page._id);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Published
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="secondary">Draft</Badge>
        );
      case 'archived':
        return (
          <Badge variant="outline" className="text-zinc-500">
            Archived
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Pages</h1>
          <p className="text-zinc-500 mt-1">
            Manage your website pages and content
          </p>
        </div>
        <Link href="/admin/pages/new">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            New Page
          </Button>
        </Link>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Pages table */}
      <div className="bg-white rounded-lg border border-zinc-200">
        {isLoading ? (
          <div className="p-8 text-center text-zinc-500">Loading pages...</div>
        ) : filteredPages?.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-zinc-300" />
            <h3 className="mt-4 text-lg font-medium text-zinc-900">No pages found</h3>
            <p className="mt-2 text-zinc-500">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'Get started by creating your first page'}
            </p>
            {!searchQuery && (
              <Link href="/admin/pages/new">
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Page
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages?.map((page) => (
                <TableRow key={page._id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{page.title}</span>
                      {page.isHomePage && (
                        <span title="Home Page">
                          <Home className="h-4 w-4 text-amber-500" />
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500">/{page.slug}</TableCell>
                  <TableCell>{getStatusBadge(page.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-zinc-500">
                      <Layers className="h-4 w-4" />
                      {Array.isArray(page.sections) ? page.sections.length : 0}
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/pages/${page._id}`)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/pages/${page._id}/builder`)}
                        >
                          <Layers className="mr-2 h-4 w-4" />
                          Open Builder
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => window.open(`/${page.slug}`, '_blank')}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Page
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleTogglePublish(page)}>
                          <Globe className="mr-2 h-4 w-4" />
                          {page.status === 'published' ? 'Unpublish' : 'Publish'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(page._id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        {isAdmin && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(page)}
                              className="text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{pageToDelete?.title}&quot;? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
