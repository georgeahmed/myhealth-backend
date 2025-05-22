/*************************************************************************
 *  src/app.ts
 *  Express application with env-check, logging, CORS, routers, and
 *  a central error handler.  Import this in src/server.ts and call
 *  app.listen() there.
 *************************************************************************/

import 'dotenv-safe/config';               // 1️⃣  env vars must load first
import express from 'express';

// ── Middleware ─────────────────────────────────────────────────────────
import corsMW from './middleware/cors';           // CORS whitelist
import logger from './middleware/logger';         // pino + trace-id
import errorHandler from './middleware/errorHandler';
import ApiError from './utils/ApiError';

// ── Routers ────────────────────────────────────────────────────────────
import authRouter from './routes/auth';    // /api/auth/*
import demoRouter from './routes/demo';    // /api/demo/*  (doctor-only demo)

const app = express();

/* ---------- Global middlewares ---------- */
app.use(logger);            // request log & trace-id
app.use(corsMW);            // CORS (must run before routes)
app.use(express.json());    // body-parser for JSON

/* ---------- Feature routes -------------- */
app.use('/api/auth', authRouter);
app.use('/api/demo', demoRouter);

/* ---------- Root (optional) ------------- */
app.get('/', (_, res) => res.send('Hello'));

/* ---------- 404 fallback ---------------- */
app.use((_, __, next) => next(new ApiError(404, 'Not Found')));

/* ---------- Central error handler ------- */
app.use(errorHandler);

export default app;
