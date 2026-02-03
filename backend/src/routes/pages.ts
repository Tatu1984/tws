import { Router } from 'express';
import { body } from 'express-validator';
import {
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
  addSectionToPage,
  removeSectionFromPage,
  reorderSections,
  duplicatePage,
} from '../controllers/pageController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all pages
router.get('/', getPages);

// Get single page
router.get('/:id', getPage);

// Create page (admin/editor only)
router.post(
  '/',
  authorize('admin', 'editor'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('slug')
      .optional()
      .matches(/^[a-z0-9-]+$/)
      .withMessage('Slug must be lowercase alphanumeric with hyphens'),
  ],
  createPage
);

// Update page (admin/editor only)
router.put('/:id', authorize('admin', 'editor'), updatePage);

// Delete page (admin only)
router.delete('/:id', authorize('admin'), deletePage);

// Add section to page
router.post('/:id/sections', authorize('admin', 'editor'), addSectionToPage);

// Remove section from page
router.delete(
  '/:id/sections/:sectionId',
  authorize('admin', 'editor'),
  removeSectionFromPage
);

// Reorder sections
router.put('/:id/sections/reorder', authorize('admin', 'editor'), reorderSections);

// Duplicate page
router.post('/:id/duplicate', authorize('admin', 'editor'), duplicatePage);

export default router;
