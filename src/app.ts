// src/app.ts
import express from 'express';
// @ts-ignore
import { User } from '../models'; // if you want to show /users route
import authRouter from './auth.routes';

const app = express();
app.use(express.json());

// Basic route
app.get('/', (req: any, res: any) => {
  res.send('Hello from myhealth-backend!');
});

// Auth routes
app.use('/auth', authRouter);

// Example: /users route
app.get('/users', async (req: any, res: any) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
