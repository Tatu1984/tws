'use client';

import { useBuilderStore, useSelectedBlock, useSelectedSection } from '@/lib/stores';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BLOCK_DEFINITIONS, type Section, type SectionSettings, type SectionStyle } from '@/lib/types';
import { getAvailableComponents, componentMeta } from '@/components/blocks/ComponentRegistry';
import { Layers, Settings, Palette, X } from 'lucide-react';

export function PropertiesPanel() {
  const {
    activePanel,
    setActivePanel,
    selectedSectionId,
    selectedBlockId,
    updateBlock,
    updateSection,
  } = useBuilderStore();
  const selectedSection = useSelectedSection();
  const selectedBlock = useSelectedBlock();

  if (activePanel !== 'properties') return null;

  if (!selectedSection && !selectedBlock) {
    return (
      <div className="w-80 bg-white border-l border-zinc-200 p-4">
        <div className="text-center text-zinc-500 py-8">
          <Settings className="h-12 w-12 mx-auto text-zinc-300 mb-2" />
          <p>Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const blockDef = selectedBlock
    ? BLOCK_DEFINITIONS.find((d) => d.type === selectedBlock.type)
    : null;

  return (
    <div className="w-80 bg-white border-l border-zinc-200 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-zinc-200 p-4 flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900">
          {selectedBlock ? blockDef?.label || 'Block' : 'Section'} Properties
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActivePanel('blocks')}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="content" className="p-4">
        <TabsList className="w-full">
          <TabsTrigger value="content" className="flex-1">
            <Layers className="h-4 w-4 mr-1" />
            Content
          </TabsTrigger>
          <TabsTrigger value="style" className="flex-1">
            <Palette className="h-4 w-4 mr-1" />
            Style
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4 space-y-4">
          {selectedBlock ? (
            <BlockContentEditor
              block={selectedBlock}
              sectionId={selectedSectionId!}
              onUpdate={(content) =>
                updateBlock(selectedSectionId!, selectedBlockId!, { content })
              }
            />
          ) : selectedSection ? (
            <SectionContentEditor
              section={selectedSection}
              onUpdate={(updates) => updateSection(selectedSection._id, updates)}
            />
          ) : null}
        </TabsContent>

        <TabsContent value="style" className="mt-4 space-y-4">
          {selectedBlock ? (
            <BlockStyleEditor
              block={selectedBlock}
              sectionId={selectedSectionId!}
              onUpdate={(style) =>
                updateBlock(selectedSectionId!, selectedBlockId!, { style })
              }
            />
          ) : selectedSection ? (
            <SectionStyleEditor
              section={selectedSection}
              onUpdate={(updates) => updateSection(selectedSection._id, updates)}
            />
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Block Content Editor Component
function BlockContentEditor({
  block,
  sectionId,
  onUpdate,
}: {
  block: { type: string; content: Record<string, unknown> };
  sectionId: string;
  onUpdate: (content: Record<string, unknown>) => void;
}) {
  const content = block.content;

  const handleChange = (key: string, value: unknown) => {
    onUpdate({ ...content, [key]: value });
  };

  // Render different editors based on block type
  switch (block.type) {
    case 'heading':
      return (
        <>
          <div className="space-y-2">
            <Label>Text</Label>
            <Input
              value={(content.text as string) || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              placeholder="Heading text"
            />
          </div>
          <div className="space-y-2">
            <Label>Level</Label>
            <Select
              value={(content.level as string) || 'h2'}
              onValueChange={(value) => handleChange('level', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h1">H1</SelectItem>
                <SelectItem value="h2">H2</SelectItem>
                <SelectItem value="h3">H3</SelectItem>
                <SelectItem value="h4">H4</SelectItem>
                <SelectItem value="h5">H5</SelectItem>
                <SelectItem value="h6">H6</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      );

    case 'text':
      return (
        <div className="space-y-2">
          <Label>Content</Label>
          <Textarea
            value={(content.content as string) || ''}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="Enter text content..."
            rows={6}
          />
        </div>
      );

    case 'button':
      return (
        <>
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input
              value={(content.text as string) || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              placeholder="Click me"
            />
          </div>
          <div className="space-y-2">
            <Label>Link URL</Label>
            <Input
              value={(content.href as string) || ''}
              onChange={(e) => handleChange('href', e.target.value)}
              placeholder="/page-url"
            />
          </div>
          <div className="space-y-2">
            <Label>Variant</Label>
            <Select
              value={(content.variant as string) || 'default'}
              onValueChange={(value) => handleChange('variant', value)}
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
        </>
      );

    case 'image':
      return (
        <>
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              value={(content.src as string) || ''}
              onChange={(e) => handleChange('src', e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label>Alt Text</Label>
            <Input
              value={(content.alt as string) || ''}
              onChange={(e) => handleChange('alt', e.target.value)}
              placeholder="Image description"
            />
          </div>
          <div className="space-y-2">
            <Label>Caption</Label>
            <Input
              value={(content.caption as string) || ''}
              onChange={(e) => handleChange('caption', e.target.value)}
              placeholder="Optional caption"
            />
          </div>
        </>
      );

    case 'hero':
      return (
        <>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={(content.title as string) || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Hero title"
            />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={(content.subtitle as string) || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="Subtitle or tagline"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={(content.description as string) || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Hero description..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Background Image</Label>
            <Input
              value={(content.backgroundImage as string) || ''}
              onChange={(e) => handleChange('backgroundImage', e.target.value)}
              placeholder="https://..."
            />
          </div>
        </>
      );

    case 'cta':
      return (
        <>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={(content.title as string) || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="CTA title"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={(content.description as string) || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="CTA description..."
              rows={2}
            />
          </div>
        </>
      );

    case 'component': {
      const componentName = (content.component as string) || '';
      const props = (content.props || {}) as Record<string, unknown>;
      const meta = componentName ? componentMeta[componentName] : null;
      const availableComponents = getAvailableComponents();

      const handlePropsChange = (key: string, value: unknown) => {
        handleChange('props', { ...props, [key]: value });
      };

      return (
        <>
          <div className="space-y-2">
            <Label>Component</Label>
            <Select
              value={componentName}
              onValueChange={(value) => handleChange('component', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select component" />
              </SelectTrigger>
              <SelectContent>
                {availableComponents.map((name) => (
                  <SelectItem key={name} value={name}>
                    {componentMeta[name]?.displayName || name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {meta && meta.description && (
            <p className="text-xs text-zinc-500">{meta.description}</p>
          )}

          {meta && meta.editableProps.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-4">
              <h4 className="text-sm font-medium text-zinc-700">Component Props</h4>
              {meta.editableProps.map((prop) => (
                <div key={prop.name} className="space-y-2">
                  <Label>{prop.label}</Label>
                  {prop.type === 'text' ? (
                    <Textarea
                      value={(props[prop.name] as string) || prop.defaultValue as string || ''}
                      onChange={(e) => handlePropsChange(prop.name, e.target.value)}
                      placeholder={prop.defaultValue as string}
                      rows={3}
                    />
                  ) : prop.type === 'url' ? (
                    <Input
                      value={(props[prop.name] as string) || prop.defaultValue as string || ''}
                      onChange={(e) => handlePropsChange(prop.name, e.target.value)}
                      placeholder={prop.defaultValue as string}
                      type="url"
                    />
                  ) : (
                    <Input
                      value={(props[prop.name] as string) || prop.defaultValue as string || ''}
                      onChange={(e) => handlePropsChange(prop.name, e.target.value)}
                      placeholder={prop.defaultValue as string}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {meta && meta.editableProps.length === 0 && (
            <p className="text-xs text-zinc-500 italic mt-2">
              This component has no editable props. Its content is defined in code.
            </p>
          )}
        </>
      );
    }

    default:
      return (
        <div className="text-sm text-zinc-500 text-center py-4">
          <p>Edit this block type in the code editor</p>
          <pre className="mt-2 p-2 bg-zinc-100 rounded text-xs text-left overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      );
  }
}

// Block Style Editor Component
function BlockStyleEditor({
  block,
  sectionId,
  onUpdate,
}: {
  block: { style?: Record<string, unknown> };
  sectionId: string;
  onUpdate: (style: Record<string, unknown>) => void;
}) {
  const style = block.style || {};

  const handleChange = (key: string, value: unknown) => {
    onUpdate({ ...style, [key]: value });
  };

  return (
    <>
      <div className="space-y-2">
        <Label>Text Alignment</Label>
        <Select
          value={(style.textAlign as string) || 'left'}
          onValueChange={(value) => handleChange('textAlign', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Padding</Label>
        <Input
          value={(style.padding as string) || ''}
          onChange={(e) => handleChange('padding', e.target.value)}
          placeholder="e.g., 1rem"
        />
      </div>
      <div className="space-y-2">
        <Label>Margin</Label>
        <Input
          value={(style.margin as string) || ''}
          onChange={(e) => handleChange('margin', e.target.value)}
          placeholder="e.g., 0 auto"
        />
      </div>
      <div className="space-y-2">
        <Label>Background Color</Label>
        <Input
          type="color"
          value={(style.backgroundColor as string) || '#ffffff'}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
        />
      </div>
    </>
  );
}

// Section Content Editor
function SectionContentEditor({
  section,
  onUpdate,
}: {
  section: Section;
  onUpdate: (updates: Partial<Section>) => void;
}) {
  return (
    <>
      <div className="space-y-2">
        <Label>Section Name</Label>
        <Input
          value={section.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Section name"
        />
      </div>
      <div className="space-y-2">
        <Label>Container Width</Label>
        <Select
          value={section.settings.containerWidth || 'default'}
          onValueChange={(value: 'narrow' | 'default' | 'wide' | 'full') =>
            onUpdate({ settings: { ...section.settings, containerWidth: value } })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="narrow">Narrow</SelectItem>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="wide">Wide</SelectItem>
            <SelectItem value="full">Full Width</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Anchor ID</Label>
        <Input
          value={section.settings.anchorId || ''}
          onChange={(e) =>
            onUpdate({ settings: { ...section.settings, anchorId: e.target.value } })
          }
          placeholder="section-anchor"
        />
      </div>
    </>
  );
}

// Section Style Editor
function SectionStyleEditor({
  section,
  onUpdate,
}: {
  section: Section;
  onUpdate: (updates: Partial<Section>) => void;
}) {
  const style = section.style;

  const handleChange = (key: string, value: unknown) => {
    onUpdate({ style: { ...style, [key]: value } as SectionStyle });
  };

  return (
    <>
      <div className="space-y-2">
        <Label>Background Color</Label>
        <Input
          type="color"
          value={style.backgroundColor || '#ffffff'}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Background Image</Label>
        <Input
          value={style.backgroundImage || ''}
          onChange={(e) => handleChange('backgroundImage', e.target.value)}
          placeholder="https://..."
        />
      </div>
      <div className="space-y-2">
        <Label>Padding Top</Label>
        <Input
          value={style.padding?.top || ''}
          onChange={(e) =>
            handleChange('padding', {
              ...style.padding,
              top: e.target.value,
            })
          }
          placeholder="e.g., 4rem"
        />
      </div>
      <div className="space-y-2">
        <Label>Padding Bottom</Label>
        <Input
          value={style.padding?.bottom || ''}
          onChange={(e) =>
            handleChange('padding', {
              ...style.padding,
              bottom: e.target.value,
            })
          }
          placeholder="e.g., 4rem"
        />
      </div>
      <div className="space-y-2">
        <Label>Custom CSS Class</Label>
        <Input
          value={style.customClass || ''}
          onChange={(e) => handleChange('customClass', e.target.value)}
          placeholder="my-custom-class"
        />
      </div>
    </>
  );
}
