'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import type { Page, CreatePageData, UpdatePageData } from '@/lib/types';

const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().max(160, 'Meta description should be under 160 characters').optional(),
  metaKeywords: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  template: z.string().optional(),
  showInNavigation: z.boolean(),
  navigationLabel: z.string().optional(),
  isHomePage: z.boolean(),
});

type PageFormData = z.infer<typeof pageSchema>;

interface PageFormProps {
  page?: Page;
  onSubmit: (data: CreatePageData) => Promise<void>;
  isSubmitting?: boolean;
}

export function PageForm({ page, onSubmit, isSubmitting }: PageFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: page?.title || '',
      slug: page?.slug || '',
      description: page?.description || '',
      metaTitle: page?.metaTitle || '',
      metaDescription: page?.metaDescription || '',
      metaKeywords: page?.metaKeywords?.join(', ') || '',
      status: page?.status || 'draft',
      template: page?.template || 'default',
      showInNavigation: page?.showInNavigation ?? true,
      navigationLabel: page?.navigationLabel || '',
      isHomePage: page?.isHomePage || false,
    },
  });

  const showInNavigation = watch('showInNavigation');
  const title = watch('title');

  const handleFormSubmit = async (data: PageFormData) => {
    const formData: CreatePageData = {
      title: data.title,
      slug: data.slug || undefined,
      description: data.description || undefined,
      metaTitle: data.metaTitle || undefined,
      metaDescription: data.metaDescription || undefined,
      metaKeywords: data.metaKeywords
        ? data.metaKeywords.split(',').map((k) => k.trim()).filter(Boolean)
        : undefined,
      status: data.status,
      template: data.template || 'default',
      showInNavigation: data.showInNavigation,
      navigationLabel: data.navigationLabel || undefined,
      isHomePage: data.isHomePage,
    };
    await onSubmit(formData);
  };

  // Auto-generate slug from title
  const generateSlug = () => {
    if (title && !page?.slug) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Page title"
                {...register('title')}
                onBlur={generateSlug}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">/</span>
                <Input
                  id="slug"
                  placeholder="page-slug"
                  {...register('slug')}
                />
              </div>
              <p className="text-xs text-zinc-500">
                Leave empty to auto-generate from title
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the page"
              rows={3}
              {...register('description')}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch('status')}
                onValueChange={(value: 'draft' | 'published' | 'archived') =>
                  setValue('status', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select
                value={watch('template') || 'default'}
                onValueChange={(value) => setValue('template', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="full-width">Full Width</SelectItem>
                  <SelectItem value="landing">Landing Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showInNavigation">Show in Navigation</Label>
              <p className="text-sm text-zinc-500">
                Display this page in the site navigation menu
              </p>
            </div>
            <Switch
              id="showInNavigation"
              checked={showInNavigation}
              onCheckedChange={(checked) => setValue('showInNavigation', checked)}
            />
          </div>

          {showInNavigation && (
            <div className="space-y-2">
              <Label htmlFor="navigationLabel">Navigation Label</Label>
              <Input
                id="navigationLabel"
                placeholder="Custom label (defaults to title)"
                {...register('navigationLabel')}
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <Label htmlFor="isHomePage">Set as Home Page</Label>
              <p className="text-sm text-zinc-500">
                Make this the default landing page
              </p>
            </div>
            <Switch
              id="isHomePage"
              checked={watch('isHomePage')}
              onCheckedChange={(checked) => setValue('isHomePage', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              placeholder="SEO title (defaults to page title)"
              {...register('metaTitle')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              placeholder="Brief description for search engines"
              rows={2}
              {...register('metaDescription')}
            />
            {errors.metaDescription && (
              <p className="text-sm text-red-500">{errors.metaDescription.message}</p>
            )}
            <p className="text-xs text-zinc-500">
              {watch('metaDescription')?.length || 0}/160 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaKeywords">Keywords</Label>
            <Input
              id="metaKeywords"
              placeholder="keyword1, keyword2, keyword3"
              {...register('metaKeywords')}
            />
            <p className="text-xs text-zinc-500">Separate keywords with commas</p>
          </div>
        </CardContent>
      </Card>

      {/* Submit button */}
      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : page ? (
            'Save Changes'
          ) : (
            'Create Page'
          )}
        </Button>
      </div>
    </form>
  );
}
