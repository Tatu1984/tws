import { Router } from 'express';
import { body } from 'express-validator';
import {
  getFooters,
  getFooter,
  createFooter,
  updateFooter,
  deleteFooter,
  duplicateFooter,
} from '../controllers/footerController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all footers
router.get('/', getFooters);

// Get single footer (or 'default' for the default footer)
router.get('/:id', getFooter);

// Create footer (admin/editor only)
router.post(
  '/',
  authorize('admin', 'editor'),
  [body('name').notEmpty().withMessage('Footer name is required')],
  createFooter
);

// Update footer (admin/editor only)
router.put('/:id', authorize('admin', 'editor'), updateFooter);

// Delete footer (admin only)
router.delete('/:id', authorize('admin'), deleteFooter);

// Duplicate footer
router.post('/:id/duplicate', authorize('admin', 'editor'), duplicateFooter);

export default router;
