import { TransactionDTO } from "../dtos/transaction.dto";

export interface ITransactionRepository {
    create(userId: number, payload: TransactionDTO): Promise<any>;
    update(id: number, userId: number, payload: Partial<TransactionDTO>): Promise<any>;
    delete(id: number, userId: number): Promise<void>;
    findById(id: number, userId: number): Promise<any>;
    findAll(
        userId: number,
        filters: any,
        options: { skip: number; limit: number }
    ): Promise<{ items: any[]; total: number }>;
    getSummary(userId: number, from?: Date, to?: Date): Promise<any>;
}
