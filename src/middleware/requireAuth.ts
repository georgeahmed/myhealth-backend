import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';

interface JwtPayload {
  id: string;
  role: 'patient' | 'doctor' | 'admin';
  email: string;
}

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Missing or malformed Authorization header'));
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    // attach to request for downstream use
    (req as any).user = payload;

    return next();
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};
