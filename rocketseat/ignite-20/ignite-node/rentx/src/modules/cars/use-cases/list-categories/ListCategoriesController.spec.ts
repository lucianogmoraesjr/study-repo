import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO users (id, name, email, driver_license, password, admin, created_at)
        VALUES ($1, 'admin', 'admin@rentx.com.br', '0123456789', $2, true, now())`,
      [id, password],
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Description Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
