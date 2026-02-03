import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { authenticate, requireAdmin } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = Router();

// Get all users (admin only)
router.get('/', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get single user
router.get('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// Create user (admin only)
router.post(
  '/',
  authenticate,
  requireAdmin,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('name').notEmpty().withMessage('Name is required'),
    body('role').isIn(['admin', 'editor', 'viewer']).withMessage('Invalid role'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name, role } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  }
);

// Update user (admin only)
router.put('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { name, role, isActive } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(role && { role }),
        ...(typeof isActive === 'boolean' && { isActive }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    // Prevent self-deletion
    if (id === (req as any).user?.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;
