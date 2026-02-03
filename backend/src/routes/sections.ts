import { Router } from 'express';
import { body } from 'express-validator';
import {
  getSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
  addBlock,
  updateBlock,
  deleteBlock,
  reorderBlocks,
  duplicateSection,
} from '../controllers/sectionController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all sections
router.get('/', getSections);

// Get single section
router.get('/:id', getSection);

// Create section (admin/editor only)
router.post(
  '/',
  authorize('admin', 'editor'),
  [body('name').notEmpty().withMessage('Section name is required')],
  createSection
);

// Update section (admin/editor only)
router.put('/:id', authorize('admin', 'editor'), updateSection);

// Delete section (admin/editor only)
router.delete('/:id', authorize('admin', 'editor'), deleteSection);

// Add block to section
router.post('/:id/blocks', authorize('admin', 'editor'), addBlock);

// Update block within section
router.put('/:id/blocks/:blockId', authorize('admin', 'editor'), updateBlock);

// Delete block from section
router.delete('/:id/blocks/:blockId', authorize('admin', 'editor'), deleteBlock);

// Reorder blocks
router.put('/:id/blocks/reorder', authorize('admin', 'editor'), reorderBlocks);

// Duplicate section
router.post('/:id/duplicate', authorize('admin', 'editor'), duplicateSection);

export default router;
