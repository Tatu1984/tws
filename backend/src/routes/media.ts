import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = Router();

// Get all media
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ message: 'Failed to fetch media' });
  }
});

// Get single media item
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const media = await prisma.media.findUnique({
      where: { id },
    });
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ message: 'Failed to fetch media' });
  }
});

// Create media (placeholder - actual upload would need multer middleware)
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { filename, originalName, mimeType, size, url, alt, caption, folder } = req.body;

    const media = await prisma.media.create({
      data: {
        filename,
        originalName,
        mimeType,
        size,
        url,
        alt,
        caption,
        folder: folder || 'uploads',
      },
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('Error creating media:', error);
    res.status(500).json({ message: 'Failed to create media' });
  }
});

// Update media
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { alt, caption, folder } = req.body;

    const media = await prisma.media.update({
      where: { id },
      data: {
        ...(alt !== undefined && { alt }),
        ...(caption !== undefined && { caption }),
        ...(folder && { folder }),
      },
    });

    res.json(media);
  } catch (error) {
    console.error('Error updating media:', error);
    res.status(500).json({ message: 'Failed to update media' });
  }
});

// Delete media
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.media.delete({ where: { id } });
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ message: 'Failed to delete media' });
  }
});

export default router;
