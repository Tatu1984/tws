'use client';

import { useState } from 'react';
import { useRequireAuth } from '@/lib/hooks';
import { useHeaders, useUpdateHeader, useCreateHeader, useDeleteHeader, useSetDefaultHeader } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Plus, Trash, GripVertical, ExternalLink, Loader2 } from 'lucide-react';
import type { Header, NavItem, CreateHeaderData } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export default function HeaderEditorPage() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { data: headers, isLoading } = useHeaders();
  const updateHeader = useUpdateHeader();
  const createHeader = useCreateHeader();
  const deleteHeader = useDeleteHeader();
  const setDefaultHeader = useSetDefaultHeader();

  const [selectedHeaderId, setSelectedHeaderId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const selectedHeader = headers?.find((h) => h._id === selectedHeaderId) || headers?.[0];

  const handleCreateHeader = async () => {
    const newHeader = await createHeader.mutateAsync({
      name: 'New Header',
      logo: { text: 'Logo', href: '/' },
      navigation: [],
      style: { position: 'fixed' },
    });
    setSelectedHeaderId(newHeader._id);
  };

  const handleUpdateHeader = async (data: Partial<Header>) => {
    if (!selectedHeader) return;
    await updateHeader.mutateAsync({ id: selectedHeader._id, data });
  };

  const handleAddNavItem = () => {
    if (!selectedHeader) return;
    const newItem: NavItem = {
      id: uuidv4(),
      label: 'New Link',
      href: '/',
      type: 'link',
      order: selectedHeader.navigation.length,
    };
    handleUpdateHeader({
      navigation: [...selectedHeader.navigation, newItem],
    });
  };

  const handleUpdateNavItem = (index: number, updates: Partial<NavItem>) => {
    if (!selectedHeader) return;
    const newNavigation = [...selectedHeader.navigation];
    newNavigation[index] = { ...newNavigation[index], ...updates };
    handleUpdateHeader({ navigation: newNavigation });
  };

  const handleDeleteNavItem = (index: number) => {
    if (!selectedHeader) return;
    const newNavigation = selectedHeader.navigation.filter((_, i) => i !== index);
    handleUpdateHeader({ navigation: newNavigation });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Header Editor</h1>
          <p className="text-zinc-500 mt-1">
            Customize your site&apos;s navigation header
          </p>
        </div>
        <Button onClick={handleCreateHeader} disabled={createHeader.isPending}>
          <Plus className="mr-2 h-4 w-4" />
          New Header
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        </div>
      ) : !headers?.length ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-zinc-500 mb-4">No headers found</p>
            <Button onClick={handleCreateHeader}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Header
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Header selector */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Headers</CardTitle>
              <CardDescription>Select a header to edit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {headers.map((header) => (
                <button
                  key={header._id}
                  onClick={() => setSelectedHeaderId(header._id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    selectedHeader?._id === header._id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium">{header.name}</p>
                    {header.isDefault && (
                      <span className="text-xs text-amber-600">Default</span>
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Header editor */}
          {selectedHeader && (
            <div className="lg:col-span-2 space-y-6">
              {/* Basic settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Basic Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Header Name</Label>
                      <Input
                        value={selectedHeader.name}
                        onChange={(e) => handleUpdateHeader({ name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Select
                        value={selectedHeader.style?.position || 'fixed'}
                        onValueChange={(value: 'static' | 'sticky' | 'fixed') =>
                          handleUpdateHeader({
                            style: { ...selectedHeader.style, position: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="static">Static</SelectItem>
                          <SelectItem value="sticky">Sticky</SelectItem>
                          <SelectItem value="fixed">Fixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <Label>Set as Default</Label>
                      <p className="text-sm text-zinc-500">
                        Use this header across all pages
                      </p>
                    </div>
                    <Switch
                      checked={selectedHeader.isDefault}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setDefaultHeader.mutate(selectedHeader._id);
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Logo settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Logo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Logo Text</Label>
                      <Input
                        value={selectedHeader.logo?.text || ''}
                        onChange={(e) =>
                          handleUpdateHeader({
                            logo: { ...selectedHeader.logo, text: e.target.value },
                          })
                        }
                        placeholder="Your Brand"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Logo Image URL</Label>
                      <Input
                        value={selectedHeader.logo?.image || ''}
                        onChange={(e) =>
                          handleUpdateHeader({
                            logo: { ...selectedHeader.logo, image: e.target.value },
                          })
                        }
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Logo Link</Label>
                    <Input
                      value={selectedHeader.logo?.href || '/'}
                      onChange={(e) =>
                        handleUpdateHeader({
                          logo: { ...selectedHeader.logo, href: e.target.value },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Navigation items */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Navigation</CardTitle>
                    <CardDescription>Manage menu items</CardDescription>
                  </div>
                  <Button size="sm" onClick={handleAddNavItem}>
                    <Plus className="mr-1 h-3 w-3" />
                    Add Item
                  </Button>
                </CardHeader>
                <CardContent>
                  {selectedHeader.navigation.length === 0 ? (
                    <p className="text-sm text-zinc-500 text-center py-4">
                      No navigation items. Click &quot;Add Item&quot; to create one.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {selectedHeader.navigation.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 border border-zinc-200 rounded-lg"
                        >
                          <GripVertical className="h-4 w-4 text-zinc-400 cursor-grab" />
                          <Input
                            value={item.label}
                            onChange={(e) =>
                              handleUpdateNavItem(index, { label: e.target.value })
                            }
                            placeholder="Label"
                            className="flex-1"
                          />
                          <Input
                            value={item.href}
                            onChange={(e) =>
                              handleUpdateNavItem(index, { href: e.target.value })
                            }
                            placeholder="/path"
                            className="flex-1"
                          />
                          <Select
                            value={item.type}
                            onValueChange={(value: 'link' | 'dropdown' | 'button') =>
                              handleUpdateNavItem(index, { type: value })
                            }
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="link">Link</SelectItem>
                              <SelectItem value="dropdown">Dropdown</SelectItem>
                              <SelectItem value="button">Button</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteNavItem(index)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* CTA Button */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">CTA Button</CardTitle>
                  <CardDescription>Optional call-to-action button</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input
                        value={selectedHeader.ctaButton?.text || ''}
                        onChange={(e) =>
                          handleUpdateHeader({
                            ctaButton: {
                              ...selectedHeader.ctaButton,
                              text: e.target.value,
                              href: selectedHeader.ctaButton?.href || '#',
                            },
                          })
                        }
                        placeholder="Get Started"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Link</Label>
                      <Input
                        value={selectedHeader.ctaButton?.href || ''}
                        onChange={(e) =>
                          handleUpdateHeader({
                            ctaButton: {
                              ...selectedHeader.ctaButton,
                              text: selectedHeader.ctaButton?.text || 'CTA',
                              href: e.target.value,
                            },
                          })
                        }
                        placeholder="/contact"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Variant</Label>
                      <Select
                        value={selectedHeader.ctaButton?.variant || 'default'}
                        onValueChange={(value: 'default' | 'outline' | 'ghost') =>
                          handleUpdateHeader({
                            ctaButton: {
                              ...selectedHeader.ctaButton,
                              text: selectedHeader.ctaButton?.text || 'CTA',
                              href: selectedHeader.ctaButton?.href || '#',
                              variant: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                          <SelectItem value="ghost">Ghost</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delete header */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-base text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Header
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Delete confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Header</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{selectedHeader?.name}&quot;? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (selectedHeader) {
                  await deleteHeader.mutateAsync(selectedHeader._id);
                  setSelectedHeaderId(null);
                }
                setDeleteDialogOpen(false);
              }}
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
