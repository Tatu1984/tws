'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '@/lib/hooks';
import { useSections, useDeleteSection, useCreateSection } from '@/lib/hooks';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Plus,
  Search,
  MoreHorizontal,
  Trash,
  Layers,
  Globe,
  Loader2,
} from 'lucide-react';
import type { Section } from '@/lib/types';

export default function SectionsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const isAdmin = useIsAdmin();
  const { data: sections, isLoading } = useSections();
  const deleteSection = useDeleteSection();
  const createSection = useCreateSection();

  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<Section | null>(null);
  const [newSectionName, setNewSectionName] = useState('');

  if (authLoading || !isAuthenticated) {
    return null;
  }

  // Filter sections
  const filteredSections = sections?.filter((section) =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (section: Section) => {
    setSectionToDelete(section);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (sectionToDelete) {
      await deleteSection.mutateAsync(sectionToDelete._id);
      setDeleteDialogOpen(false);
      setSectionToDelete(null);
    }
  };

  const handleCreate = async () => {
    if (!newSectionName.trim()) return;

    await createSection.mutateAsync({
      name: newSectionName,
      type: 'reusable',
      blocks: [],
      settings: { containerWidth: 'default' },
      isGlobal: false,
    });

    setNewSectionName('');
    setCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Sections</h1>
          <p className="text-zinc-500 mt-1">
            Manage reusable sections for your pages
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Section
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Sections table */}
      <div className="bg-white rounded-lg border border-zinc-200">
        {isLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400 mx-auto" />
          </div>
        ) : filteredSections?.length === 0 ? (
          <div className="p-8 text-center">
            <Layers className="mx-auto h-12 w-12 text-zinc-300" />
            <h3 className="mt-4 text-lg font-medium text-zinc-900">No sections found</h3>
            <p className="mt-2 text-zinc-500">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'Create reusable sections to use across pages'}
            </p>
            {!searchQuery && (
              <Button className="mt-4" onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Section
              </Button>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Blocks</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSections?.map((section) => (
                <TableRow key={section._id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{section.name}</span>
                      {section.isGlobal && (
                        <span title="Global Section">
                          <Globe className="h-4 w-4 text-amber-500" />
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={section.type === 'reusable' ? 'default' : 'secondary'}>
                      {section.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {section.blocks.length} blocks
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {new Date(section.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {isAdmin && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(section)}
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

      {/* Create dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Section</DialogTitle>
            <DialogDescription>
              Create a reusable section that can be added to any page
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Section name"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!newSectionName.trim()}>
              Create Section
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Section</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{sectionToDelete?.name}&quot;? This will
              remove it from all pages using it.
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
