import { IUserRepository } from '../repositories/iUserRepository';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { config } from '../config';

export class AuthService {
  constructor(private userRepo: IUserRepository) {}

  async register(payload: any) {
    try {
    const existing = await this.userRepo.findByEmail(payload.email);
    console.log('register', existing)
    if (existing) throw new Error('EMAIL_IN_USE');

    const hashed = await bcrypt.hash(payload.password, config.bcryptSaltRounds);

    const user = await this.userRepo.create({ 
        ...payload, 
        password: hashed 
    });

    return { 
        id: user.id, 
        email: user.email, 
        name: user.name 
    };
    } catch (err) {
        console.log(err)
      throw new Error('Error registering user');
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('INVALID_CREDENTIALS');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('INVALID_CREDENTIALS');

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      secret,
      { expiresIn: "1h" }
    );

    return { 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    };
  }

  async me(id: string) {
    return this.userRepo.findById(Number(id));
  }
}
