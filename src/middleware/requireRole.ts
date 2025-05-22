import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

/**
 * Factory: pass one or more allowed roles.
 * Usage:  app.get('/admin', requireAuth, requireRole('admin'), handler)
 */
export const requireRole =
  (...allowed: ('patient' | 'doctor' | 'admin')[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      // shouldn't happen if requireAuth ran first
      return next(new ApiError(500, 'User missing on request'));
    }

    if (!allowed.includes(user.role)) {
      return next(new ApiError(403, 'Forbidden – insufficient role'));
    }

    return next();
  };
