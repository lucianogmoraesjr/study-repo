import { Connection, createConnection } from "typeorm"
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { app } from '../../../../app';

let connection: Connection

describe('Create Statement Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.runMigrations()

    const id = uuid();
    const password = await hash('123456', 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, created_at, updated_at)
      VALUES('${id}', 'John', 'john@mail.com', '${password}', 'now()', 'now()')
    `);
  })

  afterEach(async () => {
    await connection.dropDatabase()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to create a new deposit', async () => {
    const responseToken = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'john@mail.com',
        password: '123456'
      })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/api/v1/statements/deposit')
      .send({
        amount: 100.00,
        description: 'Test deposit'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(201)
  })

  it('should be able to create a new withdraw', async () => {
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
      .post('/api/v1/statements/withdraw')
      .send({
        amount: 50.00,
        description: 'Test withdraw'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new withdraw if user has insufficient funds', async () => {
    const responseToken = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'john@mail.com',
        password: '123456'
      })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/api/v1/statements/withdraw')
      .send({
        amount: 100.00,
        description: 'Test withdraw'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(400)
  })

  it('should not be able to create a new statement if user does not exists', async () => {
    const response = await request(app)
      .post('/api/v1/statements/withdraw')
      .send({
        amount: 100.00,
        description: 'Test withdraw'
      })
      .set({
        Authorization: `Bearer invalid-token`
      })

    expect(response.status).toBe(401)
  })
})
