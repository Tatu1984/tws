'use client';

import { useState } from 'react';
import { useRequireAuth } from '@/lib/hooks';
import { useFooters, useUpdateFooter, useCreateFooter, useDeleteFooter, useSetDefaultFooter } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Trash, GripVertical, Loader2 } from 'lucide-react';
import type { Footer, FooterColumn, FooterLink, SocialLink, SocialPlatform } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export default function FooterEditorPage() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { data: footers, isLoading } = useFooters();
  const updateFooter = useUpdateFooter();
  const createFooter = useCreateFooter();
  const deleteFooter = useDeleteFooter();
  const setDefaultFooter = useSetDefaultFooter();

  const [selectedFooterId, setSelectedFooterId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const selectedFooter = footers?.find((f) => f._id === selectedFooterId) || footers?.[0];

  const handleCreateFooter = async () => {
    const newFooter = await createFooter.mutateAsync({
      name: 'New Footer',
      logo: { text: 'Logo', href: '/' },
      columns: [],
      socialLinks: [],
      contactInfo: {},
      bottomBar: { copyright: `© ${new Date().getFullYear()} Your Company` },
      style: {},
    });
    setSelectedFooterId(newFooter._id);
  };

  const handleUpdateFooter = async (data: Partial<Footer>) => {
    if (!selectedFooter) return;
    await updateFooter.mutateAsync({ id: selectedFooter._id, data });
  };

  const handleAddColumn = () => {
    if (!selectedFooter) return;
    const newColumn: FooterColumn = {
      id: uuidv4(),
      title: 'New Column',
      links: [],
      order: selectedFooter.columns.length,
    };
    handleUpdateFooter({
      columns: [...selectedFooter.columns, newColumn],
    });
  };

  const handleUpdateColumn = (index: number, updates: Partial<FooterColumn>) => {
    if (!selectedFooter) return;
    const newColumns = [...selectedFooter.columns];
    newColumns[index] = { ...newColumns[index], ...updates };
    handleUpdateFooter({ columns: newColumns });
  };

  const handleDeleteColumn = (index: number) => {
    if (!selectedFooter) return;
    const newColumns = selectedFooter.columns.filter((_, i) => i !== index);
    handleUpdateFooter({ columns: newColumns });
  };

  const handleAddLinkToColumn = (columnIndex: number) => {
    if (!selectedFooter) return;
    const newLink: FooterLink = {
      id: uuidv4(),
      label: 'New Link',
      href: '/',
    };
    const newColumns = [...selectedFooter.columns];
    newColumns[columnIndex] = {
      ...newColumns[columnIndex],
      links: [...newColumns[columnIndex].links, newLink],
    };
    handleUpdateFooter({ columns: newColumns });
  };

  const handleUpdateLink = (columnIndex: number, linkIndex: number, updates: Partial<FooterLink>) => {
    if (!selectedFooter) return;
    const newColumns = [...selectedFooter.columns];
    const newLinks = [...newColumns[columnIndex].links];
    newLinks[linkIndex] = { ...newLinks[linkIndex], ...updates };
    newColumns[columnIndex] = { ...newColumns[columnIndex], links: newLinks };
    handleUpdateFooter({ columns: newColumns });
  };

  const handleDeleteLink = (columnIndex: number, linkIndex: number) => {
    if (!selectedFooter) return;
    const newColumns = [...selectedFooter.columns];
    newColumns[columnIndex] = {
      ...newColumns[columnIndex],
      links: newColumns[columnIndex].links.filter((_, i) => i !== linkIndex),
    };
    handleUpdateFooter({ columns: newColumns });
  };

  const handleAddSocialLink = () => {
    if (!selectedFooter) return;
    const newSocial: SocialLink = {
      id: uuidv4(),
      platform: 'linkedin',
      href: 'https://',
    };
    handleUpdateFooter({
      socialLinks: [...selectedFooter.socialLinks, newSocial],
    });
  };

  const handleUpdateSocialLink = (index: number, updates: Partial<SocialLink>) => {
    if (!selectedFooter) return;
    const newSocialLinks = [...selectedFooter.socialLinks];
    newSocialLinks[index] = { ...newSocialLinks[index], ...updates };
    handleUpdateFooter({ socialLinks: newSocialLinks });
  };

  const handleDeleteSocialLink = (index: number) => {
    if (!selectedFooter) return;
    handleUpdateFooter({
      socialLinks: selectedFooter.socialLinks.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Footer Editor</h1>
          <p className="text-zinc-500 mt-1">
            Customize your site&apos;s footer
          </p>
        </div>
        <Button onClick={handleCreateFooter} disabled={createFooter.isPending}>
          <Plus className="mr-2 h-4 w-4" />
          New Footer
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        </div>
      ) : !footers?.length ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-zinc-500 mb-4">No footers found</p>
            <Button onClick={handleCreateFooter}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Footer
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Footer selector */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Footers</CardTitle>
              <CardDescription>Select a footer to edit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {footers.map((footer) => (
                <button
                  key={footer._id}
                  onClick={() => setSelectedFooterId(footer._id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    selectedFooter?._id === footer._id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium">{footer.name}</p>
                    {footer.isDefault && (
                      <span className="text-xs text-amber-600">Default</span>
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Footer editor */}
          {selectedFooter && (
            <div className="lg:col-span-2 space-y-6">
              {/* Basic settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Basic Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Footer Name</Label>
                    <Input
                      value={selectedFooter.name}
                      onChange={(e) => handleUpdateFooter({ name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={selectedFooter.description || ''}
                      onChange={(e) => handleUpdateFooter({ description: e.target.value })}
                      placeholder="Brief description about your company"
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <Label>Set as Default</Label>
                      <p className="text-sm text-zinc-500">
                        Use this footer across all pages
                      </p>
                    </div>
                    <Switch
                      checked={selectedFooter.isDefault}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setDefaultFooter.mutate(selectedFooter._id);
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
                        value={selectedFooter.logo?.text || ''}
                        onChange={(e) =>
                          handleUpdateFooter({
                            logo: { ...selectedFooter.logo, text: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Logo Image URL</Label>
                      <Input
                        value={selectedFooter.logo?.image || ''}
                        onChange={(e) =>
                          handleUpdateFooter({
                            logo: { ...selectedFooter.logo, image: e.target.value },
                          })
                        }
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Link columns */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Link Columns</CardTitle>
                    <CardDescription>Organize footer links in columns</CardDescription>
                  </div>
                  <Button size="sm" onClick={handleAddColumn}>
                    <Plus className="mr-1 h-3 w-3" />
                    Add Column
                  </Button>
                </CardHeader>
                <CardContent>
                  {selectedFooter.columns.length === 0 ? (
                    <p className="text-sm text-zinc-500 text-center py-4">
                      No columns. Click &quot;Add Column&quot; to create one.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {selectedFooter.columns.map((column, colIndex) => (
                        <div key={column.id} className="border border-zinc-200 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <GripVertical className="h-4 w-4 text-zinc-400" />
                            <Input
                              value={column.title}
                              onChange={(e) =>
                                handleUpdateColumn(colIndex, { title: e.target.value })
                              }
                              placeholder="Column Title"
                              className="font-medium"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteColumn(colIndex)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>

                          {/* Links in this column */}
                          <div className="space-y-2 pl-7">
                            {column.links.map((link, linkIndex) => (
                              <div key={link.id} className="flex items-center gap-2">
                                <Input
                                  value={link.label}
                                  onChange={(e) =>
                                    handleUpdateLink(colIndex, linkIndex, { label: e.target.value })
                                  }
                                  placeholder="Label"
                                  className="flex-1"
                                />
                                <Input
                                  value={link.href}
                                  onChange={(e) =>
                                    handleUpdateLink(colIndex, linkIndex, { href: e.target.value })
                                  }
                                  placeholder="/path"
                                  className="flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteLink(colIndex, linkIndex)}
                                >
                                  <Trash className="h-3 w-3 text-red-500" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAddLinkToColumn(colIndex)}
                              className="text-zinc-500"
                            >
                              <Plus className="mr-1 h-3 w-3" />
                              Add Link
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Social links */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Social Links</CardTitle>
                  </div>
                  <Button size="sm" onClick={handleAddSocialLink}>
                    <Plus className="mr-1 h-3 w-3" />
                    Add Social
                  </Button>
                </CardHeader>
                <CardContent>
                  {selectedFooter.socialLinks.length === 0 ? (
                    <p className="text-sm text-zinc-500 text-center py-4">
                      No social links added.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {selectedFooter.socialLinks.map((social, index) => (
                        <div key={social.id} className="flex items-center gap-3">
                          <Select
                            value={social.platform}
                            onValueChange={(value: SocialPlatform) =>
                              handleUpdateSocialLink(index, { platform: value })
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="facebook">Facebook</SelectItem>
                              <SelectItem value="twitter">Twitter</SelectItem>
                              <SelectItem value="linkedin">LinkedIn</SelectItem>
                              <SelectItem value="instagram">Instagram</SelectItem>
                              <SelectItem value="youtube">YouTube</SelectItem>
                              <SelectItem value="github">GitHub</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            value={social.href}
                            onChange={(e) =>
                              handleUpdateSocialLink(index, { href: e.target.value })
                            }
                            placeholder="https://..."
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSocialLink(index)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={selectedFooter.contactInfo?.email || ''}
                      onChange={(e) =>
                        handleUpdateFooter({
                          contactInfo: { ...selectedFooter.contactInfo, email: e.target.value },
                        })
                      }
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={selectedFooter.contactInfo?.phone || ''}
                      onChange={(e) =>
                        handleUpdateFooter({
                          contactInfo: { ...selectedFooter.contactInfo, phone: e.target.value },
                        })
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Textarea
                      value={selectedFooter.contactInfo?.address || ''}
                      onChange={(e) =>
                        handleUpdateFooter({
                          contactInfo: { ...selectedFooter.contactInfo, address: e.target.value },
                        })
                      }
                      placeholder="123 Main St, City, Country"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Bottom bar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Bottom Bar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Copyright Text</Label>
                    <Input
                      value={selectedFooter.bottomBar?.copyright || ''}
                      onChange={(e) =>
                        handleUpdateFooter({
                          bottomBar: { ...selectedFooter.bottomBar, copyright: e.target.value },
                        })
                      }
                      placeholder="© 2024 Your Company"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delete footer */}
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
                    Delete Footer
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
            <AlertDialogTitle>Delete Footer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{selectedFooter?.name}&quot;? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (selectedFooter) {
                  await deleteFooter.mutateAsync(selectedFooter._id);
                  setSelectedFooterId(null);
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
