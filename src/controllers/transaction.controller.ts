import { Router } from 'express';
import { TransactionPrismaRepository } from '../repositories/prisma/transaction.repository.prisma';
import { TransactionService } from '../services/transaction.service';
import { authMiddleware, AuthRequest } from '../middlewares/auth.middleware';
import { transactionSchema, transactionUpdateSchema } from '../dtos/transaction.dto';
import { exportCsv } from '../utils/csv';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import { Transform as Json2csvTransform } from 'json2csv';
import { validate } from '../middlewares/validate.middleware';

const router = Router();
const repo = new TransactionPrismaRepository();
const service = new TransactionService(repo);

router.use(authMiddleware);

router.post('/', validate(transactionSchema, 'body'), async (req: AuthRequest, res) => {
  try {
    const payload = req.body;
    const userId = req.user!.id;
    const result = await service.create(userId, payload);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { page = '1', perPage = '10', from, to, type, category } = req.query;
    const data = await service.list(userId, { from, to, type, category }, Number(page), Number(perPage));
    return res.json(data);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

router.get('/summary', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { from, to } = req.query;
    const data = await service.summary(userId, from as string | undefined, to as string | undefined);
    return res.json(data);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

router.get('/export', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { from, to, type, category } = req.query;

    // campos CSV
    const fields = ['id', 'type', 'amount', 'category', 'description', 'date'];
    const json2csv = new Json2csvTransform({ fields }, { objectMode: true });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="transactions.csv"');

    const asyncGenerator = async function* () {
      let page = 1;
      const perPage = 500;
      while (true) {
        const { items } = await repo.findAll(
          userId,
          { from, to, type, category },
          { skip: (page - 1) * perPage, limit: perPage }
        );
        if (!items.length) break;
        for (const it of items) {
          yield {
            id: it.id,
            type: it.type,
            amount: it.amount,
            category: it.category ?? '',
            description: it.description ?? '',
            date: it.date instanceof Date ? it.date.toISOString() : it.date
          };
        }
        if (items.length < perPage) break;
        page++;
      }
    };

    await pipeline(Readable.from(asyncGenerator()), json2csv, res);
  } catch (err: any) {
    console.error('Export CSV error', err);
    if (!res.headersSent) return res.status(500).json({ message: 'Error exporting CSV' });
    try { res.end(); } catch (e) {}
  }
});

router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const id = req.params.id;
    const userId = req.user!.id;
    const data = await service.getById(id, userId);
    if (!data) return res.status(404).json({ message: 'Not found' });
    return res.json(data);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

router.put('/:id', validate(transactionUpdateSchema, 'body'), async (req: AuthRequest, res) => {
  try {
    const id = req.params.id;
    const userId = req.user!.id;
    const dto = req.body;
    const data = await service.update(id, userId, dto);
    return res.json(data);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const id = req.params.id;
    const userId = req.user!.id;
    await service.delete(id, userId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

export default router;
