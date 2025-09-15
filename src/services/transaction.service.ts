import { ITransactionRepository } from '../repositories/iTransactionRepository';
import { TransactionDTO } from '../dtos/transaction.dto';

export class TransactionService {
  constructor(private repo: ITransactionRepository) {}

  async create(userId: string, dto: TransactionDTO) {
    return this.repo.create(Number(userId), dto);
  }

  async update(id: string, userId: string, dto: Partial<TransactionDTO>) {
    return this.repo.update(Number(id), Number(userId), dto);
  }

  async delete(id: string, userId: string) {
    return this.repo.delete(Number(id), Number(userId));
  }

  async getById(id: string, userId: string) {
    return this.repo.findById(Number(id), Number(userId));
  }

  async list(userId: string, filters: any, page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;
    return this.repo.findAll(Number(userId), filters, { skip, limit: perPage });
  }

  async summary(userId: string, from?: string, to?: string) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;
    return this.repo.getSummary(Number(userId), fromDate, toDate);
  }
}
