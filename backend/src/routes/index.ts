import { Router } from 'express';
import authRoutes from './auth';
import pageRoutes from './pages';
import sectionRoutes from './sections';
import headerRoutes from './headers';
import footerRoutes from './footers';
import publicRoutes from './public';
import userRoutes from './users';
import mediaRoutes from './media';

const router = Router();

// Public routes (no authentication required)
router.use('/public', publicRoutes);

// Auth routes
router.use('/auth', authRoutes);

// Protected CMS routes
router.use('/pages', pageRoutes);
router.use('/sections', sectionRoutes);
router.use('/headers', headerRoutes);
router.use('/footers', footerRoutes);
router.use('/users', userRoutes);
router.use('/media', mediaRoutes);

export default router;
