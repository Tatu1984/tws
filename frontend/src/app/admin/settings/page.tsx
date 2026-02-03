'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRequireAuth } from '@/lib/hooks';
import { useSiteSettings, useUpdateSiteSettings } from '@/lib/hooks';
import { useIsAdmin } from '@/lib/stores';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save } from 'lucide-react';
import type { UpdateSiteSettingsData } from '@/lib/types';

export default function SettingsPage() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const isAdmin = useIsAdmin();
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();

  const { register, handleSubmit, reset, watch, setValue } = useForm<UpdateSiteSettingsData>();

  // Populate form when settings load
  useEffect(() => {
    if (settings) {
      reset({
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        seo: settings.seo,
        colors: settings.colors,
        typography: settings.typography,
        social: settings.social,
        contact: settings.contact,
        analytics: settings.analytics,
        customCode: settings.customCode,
        maintenance: settings.maintenance,
      });
    }
  }, [settings, reset]);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium text-zinc-900">Access Denied</h2>
        <p className="text-zinc-500 mt-1">
          You need admin privileges to access site settings.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  const onSubmit = async (data: UpdateSiteSettingsData) => {
    await updateSettings.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Site Settings</h1>
          <p className="text-zinc-500 mt-1">
            Configure global settings for your website
          </p>
        </div>
        <Button type="submit" disabled={updateSettings.isPending}>
          {updateSettings.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>
                Basic information about your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  {...register('siteName')}
                  placeholder="Your Website Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  {...register('siteDescription')}
                  placeholder="Brief description of your website"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>
                Take your site offline for maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Maintenance Mode</Label>
                  <p className="text-sm text-zinc-500">
                    Show maintenance page to visitors
                  </p>
                </div>
                <Switch
                  checked={watch('maintenance.enabled')}
                  onCheckedChange={(checked) =>
                    setValue('maintenance.enabled', checked)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                <Textarea
                  id="maintenanceMessage"
                  {...register('maintenance.message')}
                  placeholder="We'll be back soon!"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Defaults</CardTitle>
              <CardDescription>
                Default SEO settings for all pages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoDefaultTitle">Default Title</Label>
                <Input
                  id="seoDefaultTitle"
                  {...register('seo.defaultTitle')}
                  placeholder="Your Website"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoTitleSuffix">Title Suffix</Label>
                <Input
                  id="seoTitleSuffix"
                  {...register('seo.titleSuffix')}
                  placeholder=" | Your Website"
                />
                <p className="text-xs text-zinc-500">
                  Appended to all page titles
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoDefaultDescription">Default Description</Label>
                <Textarea
                  id="seoDefaultDescription"
                  {...register('seo.defaultDescription')}
                  placeholder="Your website description"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Settings */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Your social media profile URLs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="socialFacebook">Facebook</Label>
                  <Input
                    id="socialFacebook"
                    {...register('social.facebook')}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialTwitter">Twitter / X</Label>
                  <Input
                    id="socialTwitter"
                    {...register('social.twitter')}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialLinkedin">LinkedIn</Label>
                  <Input
                    id="socialLinkedin"
                    {...register('social.linkedin')}
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialInstagram">Instagram</Label>
                  <Input
                    id="socialInstagram"
                    {...register('social.instagram')}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialYoutube">YouTube</Label>
                  <Input
                    id="socialYoutube"
                    {...register('social.youtube')}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Your business contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register('contact.email')}
                  placeholder="contact@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  id="contactPhone"
                  {...register('contact.phone')}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactAddress">Address</Label>
                <Textarea
                  id="contactAddress"
                  {...register('contact.address')}
                  placeholder="123 Main St, City, Country"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Settings */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Google Analytics</CardTitle>
              <CardDescription>
                Connect your analytics tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gaId">Google Analytics ID</Label>
                <Input
                  id="gaId"
                  {...register('analytics.googleAnalyticsId')}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gtmId">Google Tag Manager ID</Label>
                <Input
                  id="gtmId"
                  {...register('analytics.googleTagManagerId')}
                  placeholder="GTM-XXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Code</CardTitle>
              <CardDescription>
                Add custom scripts to your site (use with caution)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="headScripts">Head Scripts</Label>
                <Textarea
                  id="headScripts"
                  {...register('customCode.headScripts')}
                  placeholder="<!-- Add scripts that go in <head> -->"
                  rows={4}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-zinc-500">
                  Scripts added to the {'<head>'} of every page
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyStartScripts">Body Start Scripts</Label>
                <Textarea
                  id="bodyStartScripts"
                  {...register('customCode.bodyStartScripts')}
                  placeholder="<!-- Add scripts for start of <body> -->"
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyEndScripts">Body End Scripts</Label>
                <Textarea
                  id="bodyEndScripts"
                  {...register('customCode.bodyEndScripts')}
                  placeholder="<!-- Add scripts for end of <body> -->"
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
