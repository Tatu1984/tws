import { Response } from 'express';
import { Header } from '../models';
import { AuthRequest } from '../middleware/auth';

const generateId = () => Math.random().toString(36).substring(2, 15);

// Get all headers
export const getHeaders = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const headers = await Header.find()
      .sort({ isDefault: -1, createdAt: -1 })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    res.json({ headers });
  } catch (error) {
    console.error('Get headers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single header
export const getHeader = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    let header;
    if (id === 'default') {
      header = await Header.findOne({ isDefault: true });
    } else {
      header = await Header.findById(id);
    }

    if (!header) {
      res.status(404).json({ message: 'Header not found' });
      return;
    }

    res.json({ header });
  } catch (error) {
    console.error('Get header error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new header
export const createHeader = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, isDefault, logo, navigation, ctaButton, style } = req.body;

    // Process navigation items to ensure IDs
    const processedNavigation = (navigation || []).map((item: any, index: number) => ({
      ...item,
      id: item.id || generateId(),
      order: item.order ?? index,
      children: item.children?.map((child: any, childIndex: number) => ({
        ...child,
        id: child.id || generateId(),
        order: child.order ?? childIndex,
      })),
    }));

    const header = new Header({
      name,
      isDefault: isDefault || false,
      logo: logo || {},
      navigation: processedNavigation,
      ctaButton,
      style: style || {},
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    });

    await header.save();

    res.status(201).json({
      message: 'Header created successfully',
      header,
    });
  } catch (error) {
    console.error('Create header error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update header
export const updateHeader = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Process navigation items if being updated
    if (updates.navigation) {
      updates.navigation = updates.navigation.map((item: any, index: number) => ({
        ...item,
        id: item.id || generateId(),
        order: item.order ?? index,
        children: item.children?.map((child: any, childIndex: number) => ({
          ...child,
          id: child.id || generateId(),
          order: child.order ?? childIndex,
        })),
      }));
    }

    const header = await Header.findByIdAndUpdate(
      id,
      {
        ...updates,
        updatedBy: req.user?._id,
      },
      { new: true, runValidators: true }
    );

    if (!header) {
      res.status(404).json({ message: 'Header not found' });
      return;
    }

    res.json({
      message: 'Header updated successfully',
      header,
    });
  } catch (error) {
    console.error('Update header error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete header
export const deleteHeader = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const header = await Header.findById(id);

    if (!header) {
      res.status(404).json({ message: 'Header not found' });
      return;
    }

    if (header.isDefault) {
      res.status(400).json({ message: 'Cannot delete the default header' });
      return;
    }

    await header.deleteOne();

    res.json({ message: 'Header deleted successfully' });
  } catch (error) {
    console.error('Delete header error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Duplicate header
export const duplicateHeader = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const originalHeader = await Header.findById(id);
    if (!originalHeader) {
      res.status(404).json({ message: 'Header not found' });
      return;
    }

    // Generate new IDs for navigation items
    const newNavigation = originalHeader.navigation.map((item) => ({
      ...item,
      id: generateId(),
      children: item.children?.map((child) => ({
        ...child,
        id: generateId(),
      })),
    }));

    const newHeader = new Header({
      ...originalHeader.toObject(),
      _id: undefined,
      name: `${originalHeader.name} (Copy)`,
      isDefault: false,
      navigation: newNavigation,
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    });

    await newHeader.save();

    res.status(201).json({
      message: 'Header duplicated successfully',
      header: newHeader,
    });
  } catch (error) {
    console.error('Duplicate header error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
