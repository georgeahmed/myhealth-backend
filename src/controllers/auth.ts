import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';

/**
 * Temporary in-memory “DB”.
 * Replace with Sequelize User model when ready.
 */
const fakeUsers = new Map<string, { id: string; email: string; pwdHash: string; role: string }>();

// salt rounds set to 12  ←──────────────┐
const SALT_ROUNDS = 12;                //│
                                        //│
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role = 'patient' } = req.body;

  if (fakeUsers.has(email)) return next(new ApiError(409, 'User already exists'));

  try {
    const pwdHash = await bcrypt.hash(password, SALT_ROUNDS);   //┘  ← here
    fakeUsers.set(email, { id: crypto.randomUUID(), email, pwdHash, role });

    return res.status(201).json({ ok: true, message: 'Registered' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = fakeUsers.get(email);
  if (!user) return next(new ApiError(401, 'Invalid credentials'));

  const match = await bcrypt.compare(password, user.pwdHash);
  if (!match) return next(new ApiError(401, 'Invalid credentials'));

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  );

  return res.json({ token });
};
