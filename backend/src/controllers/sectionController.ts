import { Response } from 'express';
import { Section } from '../models';
import { AuthRequest } from '../middleware/auth';

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// Get all sections (optionally filter by type)
export const getSections = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { type, isGlobal } = req.query;

    const filter: Record<string, unknown> = {};
    if (type) filter.type = type;
    if (isGlobal !== undefined) filter.isGlobal = isGlobal === 'true';

    const sections = await Section.find(filter)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    res.json({ sections });
  } catch (error) {
    console.error('Get sections error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single section
export const getSection = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const section = await Section.findById(id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    res.json({ section });
  } catch (error) {
    console.error('Get section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new section
export const createSection = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, type, blocks, style, settings, isGlobal } = req.body;

    // Ensure all blocks have IDs
    const processedBlocks = (blocks || []).map((block: any, index: number) => ({
      ...block,
      id: block.id || generateId(),
      order: block.order ?? index,
    }));

    const section = new Section({
      name,
      type: type || 'section',
      blocks: processedBlocks,
      style: style || {},
      settings: settings || {},
      isGlobal: isGlobal || false,
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    });

    await section.save();

    res.status(201).json({
      message: 'Section created successfully',
      section,
    });
  } catch (error) {
    console.error('Create section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update section
export const updateSection = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Ensure all blocks have IDs if blocks are being updated
    if (updates.blocks) {
      updates.blocks = updates.blocks.map((block: any, index: number) => ({
        ...block,
        id: block.id || generateId(),
        order: block.order ?? index,
      }));
    }

    const section = await Section.findByIdAndUpdate(
      id,
      {
        ...updates,
        updatedBy: req.user?._id,
      },
      { new: true, runValidators: true }
    );

    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    res.json({
      message: 'Section updated successfully',
      section,
    });
  } catch (error) {
    console.error('Update section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete section
export const deleteSection = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const section = await Section.findById(id);

    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    await section.deleteOne();

    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Delete section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add block to section
export const addBlock = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { block, position } = req.body;

    const section = await Section.findById(id);
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    const newBlock = {
      ...block,
      id: block.id || generateId(),
      order: position ?? section.blocks.length,
    };

    if (position !== undefined) {
      section.blocks.splice(position, 0, newBlock);
      // Update order of subsequent blocks
      section.blocks.forEach((b, idx) => {
        b.order = idx;
      });
    } else {
      section.blocks.push(newBlock);
    }

    section.updatedBy = req.user?._id as any;
    await section.save();

    res.json({
      message: 'Block added successfully',
      section,
    });
  } catch (error) {
    console.error('Add block error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update block within section
export const updateBlock = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id, blockId } = req.params;
    const updates = req.body;

    const section = await Section.findById(id);
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    const blockIndex = section.blocks.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) {
      res.status(404).json({ message: 'Block not found' });
      return;
    }

    section.blocks[blockIndex] = {
      ...section.blocks[blockIndex],
      ...updates,
      id: blockId, // Preserve ID
    };

    section.updatedBy = req.user?._id as any;
    await section.save();

    res.json({
      message: 'Block updated successfully',
      section,
    });
  } catch (error) {
    console.error('Update block error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete block from section
export const deleteBlock = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id, blockId } = req.params;

    const section = await Section.findById(id);
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    section.blocks = section.blocks.filter((b) => b.id !== blockId);

    // Reorder remaining blocks
    section.blocks.forEach((b, idx) => {
      b.order = idx;
    });

    section.updatedBy = req.user?._id as any;
    await section.save();

    res.json({
      message: 'Block deleted successfully',
      section,
    });
  } catch (error) {
    console.error('Delete block error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reorder blocks within section
export const reorderBlocks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { blockIds } = req.body;

    const section = await Section.findById(id);
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    // Create a map of blocks by ID
    const blockMap = new Map(section.blocks.map((b) => [b.id, b]));

    // Reorder blocks based on provided IDs
    section.blocks = blockIds
      .map((id: string, index: number) => {
        const block = blockMap.get(id);
        if (block) {
          return { ...block, order: index };
        }
        return null;
      })
      .filter(Boolean);

    section.updatedBy = req.user?._id as any;
    await section.save();

    res.json({
      message: 'Blocks reordered successfully',
      section,
    });
  } catch (error) {
    console.error('Reorder blocks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Duplicate section
export const duplicateSection = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const originalSection = await Section.findById(id);
    if (!originalSection) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    // Create new blocks with new IDs
    const newBlocks = originalSection.blocks.map((block) => ({
      ...block,
      id: generateId(),
    }));

    const newSection = new Section({
      ...originalSection.toObject(),
      _id: undefined,
      name: `${originalSection.name} (Copy)`,
      blocks: newBlocks,
      isGlobal: false, // Duplicates are not global by default
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    });

    await newSection.save();

    res.status(201).json({
      message: 'Section duplicated successfully',
      section: newSection,
    });
  } catch (error) {
    console.error('Duplicate section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
