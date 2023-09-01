import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO users (id, name, email, driver_license, password, admin, created_at)
    VALUES ($1, 'admin', 'admin@rentx.com.br', '0123456789', $2, true, now())`,
    [id, password],
  );

  await connection.close();
}

create().then(() => console.log('User admin created.'));
