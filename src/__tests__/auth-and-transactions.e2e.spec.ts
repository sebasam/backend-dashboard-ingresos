import request from 'supertest';
import app from '../app';
import { prisma } from '../db/prismaClient';

describe('Auth + Transactions flow', () => {
  const email = `test+${Date.now()}@example.com`;
  const password = 'password123';
  let token = '';

    afterAll(async () => {
        await prisma.transaction.deleteMany({
            where: { user: { email } },
        });
        await prisma.user.deleteMany({
            where: { email },
        });
        await prisma.$disconnect();
    });

  it('registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({ email, password, name: 'Test' });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(email);
  });

  it('logs in and gets token', async () => {
    const res = await request(app).post('/api/auth/login').send({ email, password });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('creates a transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'INCOME', amount: 123.45, date: new Date().toISOString() });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('lists transactions', async () => {
    const res = await request(app).get('/api/transactions').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
  });
});
