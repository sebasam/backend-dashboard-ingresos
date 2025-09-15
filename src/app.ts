import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use(errorHandler);

app.get('/', (req, res) => res.json({ ok: true }));

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
