import { Router } from 'express';
import { validate } from '../middleware/validateRequest';
import { registerRules, loginRules } from '../validators/auth';      // <-- keep your rule file
import { register, login } from '../controllers/auth';               // <-- NEW controllers

const router = Router();

// ─────────────── Auth Endpoints ───────────────

// POST /api/auth/register
router.post('/register', validate(registerRules), register);

// POST /api/auth/login
router.post('/login', validate(loginRules), login);

export default router;
