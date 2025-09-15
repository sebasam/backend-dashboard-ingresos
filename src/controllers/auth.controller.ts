import { Router, Request, Response } from 'express';
import { UserPrismaRepository } from '../repositories/prisma/user.repository.prisma';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../dtos/auth.dto';

const router = Router();
const userRepo = new UserPrismaRepository();
const authService = new AuthService(userRepo);

router.post('/register', async (req: Request, res: Response) => {
  try {
    const payload = registerSchema.parse(req.body);
    const user = await authService.register(payload);
    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const payload = loginSchema.parse(req.body);
    const token = await authService.login(payload.email, payload.password);
    return res.json(token);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Error' });
  }
});

export default router;
