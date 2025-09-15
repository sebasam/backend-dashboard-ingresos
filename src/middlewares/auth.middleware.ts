// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

interface AuthPayload {
    id: string;
    email: string;
}

export interface AuthRequest extends Request {
    user?: AuthPayload;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ 
        message: 'No token provided' 
    });

    const token = auth.replace(/^Bearer\s+/, '');
    try {
        const payload = jwt.verify(token, config.jwtSecret) as AuthPayload;
        req.user = payload;
        return next();
    } catch (err) {
        return res.status(401).json({ 
            message: 'Invalid token' 
        });
    }
}