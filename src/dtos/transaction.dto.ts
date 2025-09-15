import { z } from 'zod';

export const transactionSchema = z.object({
    type: z.enum(['INCOME', 'EXPENSE']),
    amount: z.number().positive(),
    category: z.string().optional(),
    description: z.string().optional(),
    date: z.string()
});

export const transactionUpdateSchema = transactionSchema.partial();

export type TransactionDTO = z.infer<typeof transactionSchema>;
export type TransactionUpdateDTO = z.infer<typeof transactionUpdateSchema>;