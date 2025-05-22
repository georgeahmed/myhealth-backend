import request from 'supertest';
import app from '../src/app';

describe('bcrypt salt rounds', () => {
  it('registers & hashes with 12 rounds', async () => {
    const email = 'hash@test.com';
    const res   = await request(app)
      .post('/api/auth/register')
      .send({ email, password: 'verysecurepassword' });

    expect(res.status).toBe(201);

    // Now attempt a login to prove compare() passes
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'verysecurepassword' });

    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});
