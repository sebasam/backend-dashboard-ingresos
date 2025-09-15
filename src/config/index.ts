import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const envSchema = z.object({
    PORT: z.string().optional().default('4000'),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string().optional().default('7d'),
    BCRYPT_SALT_ROUNDS: z.string().optional().default('10')
});

const parsed = envSchema.parse(process.env);

export const config = {
    port: Number(parsed.PORT),
    databaseUrl: parsed.DATABASE_URL,
    jwtSecret: parsed.JWT_SECRET,
    jwtExpiresIn: parsed.JWT_EXPIRES_IN,
    bcryptSaltRounds: Number(parsed.BCRYPT_SALT_ROUNDS)
};
