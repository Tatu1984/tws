'use client';

import { useRouter } from 'next/navigation';
import { useRequireAuth, useCreatePage } from '@/lib/hooks';
import { PageForm } from '@/components/admin/forms/PageForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { CreatePageData } from '@/lib/types';

export default function NewPagePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const createPage = useCreatePage();

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const handleSubmit = async (data: CreatePageData) => {
    const page = await createPage.mutateAsync(data);
    router.push(`/admin/pages/${page._id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/pages">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Create New Page</h1>
          <p className="text-zinc-500 mt-1">
            Add a new page to your website
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl">
        <PageForm onSubmit={handleSubmit} isSubmitting={createPage.isPending} />
      </div>
    </div>
  );
}
