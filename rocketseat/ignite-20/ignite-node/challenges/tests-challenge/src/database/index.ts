import { createConnection, getConnectionOptions } from 'typeorm';

(async () => {
  const defaultOptions = await getConnectionOptions();

  if (process.env.NODE_ENV === 'test') {
    Object.assign(defaultOptions, {
      database: 'ignite-tests',
    });
    await createConnection(defaultOptions);
  } else {
    await createConnection();
  }
})();
