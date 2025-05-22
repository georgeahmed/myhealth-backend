import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/app';

const sign = (role: 'patient' | 'doctor' | 'admin') =>
  jwt.sign(
    { id: 'test-id', email: 'x@y.z', role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  );

describe('Role middleware', () => {
  it('accepts doctor token on /api/demo/doctor-secret', async () => {
    const res = await request(app)
      .get('/api/demo/doctor-secret')
      .set('Authorization', `Bearer ${sign('doctor')}`);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('rejects patient token on doctor route', async () => {
    const res = await request(app)
      .get('/api/demo/doctor-secret')
      .set('Authorization', `Bearer ${sign('patient')}`);

    expect(res.status).toBe(403);
  });

  it('rejects missing auth header', async () => {
    const res = await request(app).get('/api/demo/doctor-secret');
    expect(res.status).toBe(401);
  });
});
