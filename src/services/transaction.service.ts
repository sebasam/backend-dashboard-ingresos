import { ITransactionRepository } from '../repositories/iTransactionRepository';
import { TransactionDTO } from '../dtos/transaction.dto';

export class TransactionService {
  constructor(private repo: ITransactionRepository) {}

  async create(userId: string, dto: TransactionDTO) {
    return this.repo.create(userId, dto);
  }

  async update(id: string, userId: string, dto: Partial<TransactionDTO>) {
    return this.repo.update(id, userId, dto);
  }

  async delete(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }

  async getById(id: string, userId: string) {
    return this.repo.findById(id, userId);
  }

  async list(userId: string, filters: any, page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;
    return this.repo.findAll(userId, filters, { skip, limit: perPage });
  }

  async summary(userId: string, from?: string, to?: string) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;
    return this.repo.getSummary(userId, fromDate, toDate);
  }
}
