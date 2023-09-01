import { Connection, createConnection } from "typeorm"
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { app } from '../../../../app';

let connection: Connection

describe('Get Balance Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuid();
    const password = await hash('123456', 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, created_at, updated_at)
      VALUES('${id}', 'John', 'john@mail.com', '${password}', 'now()', 'now()')
    `);
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to get an user balance', async () => {
    const responseToken = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'john@mail.com',
        password: '123456'
      })

    const { token } = responseToken.body

    await request(app)
      .post('/api/v1/statements/deposit')
      .send({
        amount: 100.00,
        description: 'Test deposit'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    const response = await request(app)
      .get('/api/v1/statements/balance')
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(200)
    expect(response.body.balance).toBe(100);
  })

  it('should not be able to get a balance from a non-existent user', async () => {
    const response = await request(app)
      .get('/api/v1/statements/balance')
      .set({
        Authorization: `Bearer invalid-token`
      })

    expect(response.status).toBe(401)
  })

  it('should not be able to get the balance if the token is missing', async () => {
    const response = await request(app)
      .get('/api/v1/statements/balance');

    expect(response.statusCode).toBe(401);
  });
})
