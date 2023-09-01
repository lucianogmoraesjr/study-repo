import { Connection, createConnection } from "typeorm"
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { app } from '../../../../app';

let connection: Connection

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.runMigrations()
  })

  afterEach(async () => {
    await connection.dropDatabase()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to create a new user', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John',
        email: 'john@mail.com',
        password: '123456'
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new user if e-mail already exists', async () => {
    const id = uuid();
    const password = await hash('123456', 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, created_at, updated_at)
      VALUES('${id}', 'John', 'john@mail.com', '${password}', 'now()', 'now()')
    `);

    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456'
      })

    expect(response.status).toBe(400)
  })
})
