import { ErrorRequestHandler } from 'express';
import ApiError from '../utils/ApiError';

/**
 * Central error handler - must be added AFTER all routes.
 * It formats every error as JSON and logs via pino (req.log).
 */
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // pino-http attaches req.id  (uuid trace-id)
  const traceId = (req as any).id as string;

  const status  = err instanceof ApiError ? err.status  : 500;
  const message = err instanceof ApiError ? err.message : 'Internal server error';

  // structured log
  req.log.error({ err, traceId });

  return res.status(status).json({
    ok: false,
    message,
    traceId,
    details: status < 500 && err instanceof ApiError ? err.details : undefined,
  });
};

export default errorHandler;
