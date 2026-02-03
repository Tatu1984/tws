import { Router } from 'express';
import { body } from 'express-validator';
import { login, logout, getMe, changePassword } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

// Logout
router.post('/logout', logout);

// Get current user
router.get('/me', authenticate, getMe);

// Change password
router.post(
  '/change-password',
  authenticate,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters'),
  ],
  changePassword
);

export default router;
