import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

// example: a route that only doctors can see
router.get(
  '/doctor-secret',
  requireAuth,
  requireRole('doctor'),
  (_req, res) => {
    res.json({ ok: true, secret: 'The stethoscope is mightier than the sword' });
  },
);

export default router;
