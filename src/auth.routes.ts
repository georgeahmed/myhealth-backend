// src/auth.routes.ts
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @ts-ignore
import { User } from '../models'; // ignoring missing type defs

const router = express.Router();

// POST /register
router.post('/register', async (req: any, res: any) => {
  try {
    const { email, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      hashed_password: hashed,
      role: role || 'user'
    });
    return res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /login
router.post('/login', async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.hashed_password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    return res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
