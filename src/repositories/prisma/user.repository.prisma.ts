import { prisma } from '../../db/prismaClient';
import { IUserRepository } from '../iUserRepository';

export class UserPrismaRepository implements IUserRepository {
    async create(payload: any) {
        return prisma.user.create({ data: payload });
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }

    async findById(id: number) {
        return prisma.user.findUnique({ where: { id } });
    }
}
