// src/middlewares/validate.middleware.ts
import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ZodSchema, property: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse((req as any)[property]);
      (req as any)[property] = parsed;
      return next();
    } catch (err: any) {
      return res.status(400).json({
        message: 'Validation error',
        errors: err?.errors ?? err?.message ?? String(err),
      });
    }
  };
