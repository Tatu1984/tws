import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import prisma from '../lib/prisma';

export interface AuthUser {
  id: string;
  _id?: string; // For backwards compatibility
  email: string;
  name: string;
  role: string;
  isActive: boolean;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header or cookie
    const token =
      req.cookies?.token ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default-secret'
    ) as JWTPayload;

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ message: 'Invalid token or user inactive.' });
      return;
    }

    req.user = {
      id: user.id,
      _id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated.' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      return;
    }

    next();
  };
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    return;
  }

  next();
};

interface TokenUser {
  _id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export const generateToken = (user: TokenUser): string => {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const secret: Secret = process.env.JWT_SECRET || 'default-secret';
  const options: SignOptions = {
    expiresIn: '7d',
  };

  return jwt.sign(payload, secret, options);
};
