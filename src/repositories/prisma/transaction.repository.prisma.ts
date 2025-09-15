import { prisma } from "../../db/prismaClient";
import { ITransactionRepository } from "../iTransactionRepository";
import { TransactionDTO } from "../../dtos/transaction.dto";

export class TransactionPrismaRepository implements ITransactionRepository {
  async create(userId: number, payload: TransactionDTO) {
    return prisma.transaction.create({
      data: { userId, ...payload, date: new Date(payload.date) },
    });
  }

  async update(id: number, userId: number, payload: Partial<TransactionDTO>) {
    await prisma.transaction.updateMany({
      where: { id, userId },
      data: {
        ...payload,
        ...(payload.date ? { date: new Date(payload.date as string) } : {}),
      },
    });
    return this.findById(id, userId);
  }

  async delete(id: number, userId: number) {
    await prisma.transaction.deleteMany({ where: { id, userId } });
  }

  async findById(id: number, userId: number) {
    return prisma.transaction.findFirst({ where: { id, userId } });
  }

  async findAll(
    userId: number,
    filters: any = {},
    options: any = { skip: 0, limit: 10 }
  ) {
    const where: any = { userId };
    if (filters.type) where.type = filters.type;
    if (filters.category) where.category = filters.category;
    if (filters.from || filters.to) where.date = {};
    if (filters.from) where.date.gte = new Date(String(filters.from));
    if (filters.to) where.date.lte = new Date(String(filters.to));

    const items = await prisma.transaction.findMany({
      where,
      orderBy: { date: "desc" },
      skip: options.skip,
      take: options.limit,
    });
    const total = await prisma.transaction.count({ where });
    return { items, total };
  }

  async getSummary(userId: number, from?: Date, to?: Date) {
    const baseWhere: any = { userId };
    if (from || to) baseWhere.date = {};
    if (from) baseWhere.date.gte = from;
    if (to) baseWhere.date.lte = to;

    const incomes = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { ...baseWhere, type: "INCOME" },
    });
    const expenses = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { ...baseWhere, type: "EXPENSE" },
    });

    return {
      incomes: incomes._sum.amount ?? 0,
      expenses: expenses._sum.amount ?? 0,
    };
  }
}
