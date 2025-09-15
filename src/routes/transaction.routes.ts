import { Router } from 'express';
import transactionController from '../controllers/transaction.controller';

const router = Router();
router.use('/', transactionController);
export default router;