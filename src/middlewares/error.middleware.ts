// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    if (err instanceof ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: err });
    }
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(status).json({ message });
}
