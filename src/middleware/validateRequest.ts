import { validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

/**
 * Attaches the supplied rules, then checks the result.
 * If any rule fails it raises an ApiError (HTTP 422) that the
 * central error-handler will format.
 */
export const validate =
  (rules: ValidationChain[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    // run the validations in parallel
    await Promise.all(rules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    // express-validator v7 has ValidationError with .path,
    // older versions / alternative shapes may have .param.
    const details = errors.array().map((err) => {
      const e = err as any; // narrow escape hatch for TS typing
      return {
        field: e.path ?? e.param ?? 'unknown',
        msg:   e.msg,
      };
    });

    return next(new ApiError(422, 'Validation failed', details));
  };
