import { Response } from 'express';
import { Footer } from '../models';
import { AuthRequest } from '../middleware/auth';

const generateId = () => Math.random().toString(36).substring(2, 15);

// Get all footers
export const getFooters = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const footers = await Footer.find()
      .sort({ isDefault: -1, createdAt: -1 })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    res.json({ footers });
  } catch (error) {
    console.error('Get footers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single footer
export const getFooter = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    let footer;
    if (id === 'default') {
      footer = await Footer.findOne({ isDefault: true });
    } else {
      footer = await Footer.findById(id);
    }

    if (!footer) {
      res.status(404).json({ message: 'Footer not found' });
      return;
    }

    res.json({ footer });
  } catch (error) {
    console.error('Get footer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new footer
export const createFooter = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      isDefault,
      logo,
      description,
      columns,
      socialLinks,
      contactInfo,
      bottomBar,
      style,
    } = req.body;

    // Process columns and links to ensure IDs
    const processedColumns = (columns || []).map((col: any, index: number) => ({
      ...col,
      id: col.id || generateId(),
      order: col.order ?? index,
      links: col.links?.map((link: any) => ({
        ...link,
        id: link.id || generateId(),
      })),
    }));

    const processedSocialLinks = (socialLinks || []).map((link: any) => ({
      ...link,
      id: link.id || generateId(),
    }));

    const processedBottomBar = bottomBar
      ? {
          ...bottomBar,
          links: bottomBar.links?.map((link: any) => ({
            ...link,
            id: link.id || generateId(),
          })),
        }
      : undefined;

    const footer = new Footer({
      name,
      isDefault: isDefault || false,
      logo: logo || {},
      description,
      columns: processedColumns,
      socialLinks: processedSocialLinks,
      contactInfo: contactInfo || {},
      bottomBar: processedBottomBar,
      style: style || {},
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    });

    await footer.save();

    res.status(201).json({
      message: 'Footer created successfully',
      footer,
    });
  } catch (error) {
    console.error('Create footer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update footer
export const updateFooter = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Process columns if being updated
    if (updates.columns) {
      updates.columns = updates.columns.map((col: any, index: number) => ({
        ...col,
        id: col.id || generateId(),
        order: col.order ?? index,
        links: col.links?.map((link: any) => ({
          ...link,
          id: link.id || generateId(),
        })),
      }));
    }

    // Process social links if being updated
    if (updates.socialLinks) {
      updates.socialLinks = updates.socialLinks.map((link: any) => ({
        ...link,
        id: link.id || generateId(),
      }));
    }

    // Process bottom bar if being updated
    if (updates.bottomBar?.links) {
      updates.bottomBar.links = updates.bottomBar.links.map((link: any) => ({
        ...link,
        id: link.id || generateId(),
      }));
    }

    const footer = await Footer.findByIdAndUpdate(
      id,
      {
        ...updates,
        updatedBy: req.user?._id,
      },
      { new: true, runValidators: true }
    );

    if (!footer) {
      res.status(404).json({ message: 'Footer not found' });
      return;
    }

    res.json({
      message: 'Footer updated successfully',
      footer,
    });
  } catch (error) {
    console.error('Update footer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete footer
export const deleteFooter = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const footer = await Footer.findById(id);

    if (!footer) {
      res.status(404).json({ message: 'Footer not found' });
      return;
    }

    if (footer.isDefault) {
      res.status(400).json({ message: 'Cannot delete the default footer' });
      return;
    }

    await footer.deleteOne();

    res.json({ message: 'Footer deleted successfully' });
  } catch (error) {
    console.error('Delete footer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Duplicate footer
export const duplicateFooter = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const originalFooter = await Footer.findById(id);
    if (!originalFooter) {
      res.status(404).json({ message: 'Footer not found' });
      return;
    }

    // Generate new IDs
    const newColumns = originalFooter.columns.map((col) => ({
      ...col,
      id: generateId(),
      links: col.links.map((link) => ({
        ...link,
        id: generateId(),
      })),
    }));

    const newSocialLinks = originalFooter.socialLinks.map((link) => ({
      ...link,
      id: generateId(),
    }));

    const newBottomBar = originalFooter.bottomBar
      ? {
          ...originalFooter.bottomBar,
          links: originalFooter.bottomBar.links?.map((link) => ({
            ...link,
            id: generateId(),
          })),
        }
      : undefined;

    const newFooter = new Footer({
      ...originalFooter.toObject(),
      _id: undefined,
      name: `${originalFooter.name} (Copy)`,
      isDefault: false,
      columns: newColumns,
      socialLinks: newSocialLinks,
      bottomBar: newBottomBar,
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    });

    await newFooter.save();

    res.status(201).json({
      message: 'Footer duplicated successfully',
      footer: newFooter,
    });
  } catch (error) {
    console.error('Duplicate footer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
