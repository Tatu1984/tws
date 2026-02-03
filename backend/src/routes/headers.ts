import { Router } from 'express';
import { body } from 'express-validator';
import {
  getHeaders,
  getHeader,
  createHeader,
  updateHeader,
  deleteHeader,
  duplicateHeader,
} from '../controllers/headerController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all headers
router.get('/', getHeaders);

// Get single header (or 'default' for the default header)
router.get('/:id', getHeader);

// Create header (admin/editor only)
router.post(
  '/',
  authorize('admin', 'editor'),
  [body('name').notEmpty().withMessage('Header name is required')],
  createHeader
);

// Update header (admin/editor only)
router.put('/:id', authorize('admin', 'editor'), updateHeader);

// Delete header (admin only)
router.delete('/:id', authorize('admin'), deleteHeader);

// Duplicate header
router.post('/:id/duplicate', authorize('admin', 'editor'), duplicateHeader);

export default router;
