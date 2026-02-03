'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRequireAuth, usePage, useUpdatePage } from '@/lib/hooks';
import { PageForm } from '@/components/admin/forms/PageForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Layers, ExternalLink, Loader2 } from 'lucide-react';
import type { CreatePageData, UpdatePageData } from '@/lib/types';

export default function EditPagePage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;

  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { data: page, isLoading: pageLoading } = usePage(pageId);
  const updatePage = useUpdatePage();

  if (authLoading || !isAuthenticated) {
    return null;
  }

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium text-zinc-900">Page not found</h2>
        <p className="text-zinc-500 mt-1">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/admin/pages">
          <Button className="mt-4">Back to Pages</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (data: CreatePageData) => {
    await updatePage.mutateAsync({ id: pageId, data: data as UpdatePageData });
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
        return <Badge variant="secondary">Draft</Badge>;
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
        <div className="flex items-center gap-4">
          <Link href="/admin/pages">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-zinc-900">{page.title}</h1>
              {getStatusBadge(page.status)}
            </div>
            <p className="text-zinc-500 mt-1">/{page.slug}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/${page.slug}`} target="_blank">
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Page
            </Button>
          </Link>
          <Link href={`/admin/pages/${pageId}/builder`}>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
              <Layers className="mr-2 h-4 w-4" />
              Open Builder
            </Button>
          </Link>
        </div>
      </div>

      {/* Sections count */}
      <div className="bg-zinc-100 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-zinc-900">Page Content</p>
          <p className="text-sm text-zinc-500">
            This page has {page.sections?.length || 0} sections
          </p>
        </div>
        <Link href={`/admin/pages/${pageId}/builder`}>
          <Button variant="outline">
            <Layers className="mr-2 h-4 w-4" />
            Edit in Builder
          </Button>
        </Link>
      </div>

      {/* Form */}
      <div className="max-w-3xl">
        <PageForm
          page={page}
          onSubmit={handleSubmit}
          isSubmitting={updatePage.isPending}
        />
      </div>
    </div>
  );
}
