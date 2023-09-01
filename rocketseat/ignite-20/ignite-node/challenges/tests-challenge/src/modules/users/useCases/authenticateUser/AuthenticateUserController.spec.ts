import { Connection, createConnection } from "typeorm"
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { app } from '../../../../app';

let connection: Connection

describe('Authenticate User Controller', () => {
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

  it('should be able to authenticate an user', async () => {
    const response = await request(app).post('/api/v1/sessions')
    .send({
      email: 'john@mail.com',
      password: '123456'
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toBeTruthy()
  })

  it('should not be able to authenticate a non-existent user', async () => {
    const response = await request(app).post('/api/v1/sessions')
    .send({
      email: 'invalid@mail.com',
      password: '123456'
    })

    expect(response.status).toBe(401)
  })

  it('should not be able to authenticate an user with incorrect password', async () => {
    const response = await request(app).post('/api/v1/sessions')
    .send({
      email: 'john@mail.com',
      password: '123'
    })

    expect(response.status).toBe(401)
  })
})
