import { Database } from './modules/database.mjs';

(async function () {
  const database = new Database();

  try {
    await database.execute("create table author (id number, name string, age number, city string, state string, country string)");
    await Promise.all([
      database.execute("insert into author (id, name, age) values (1, Douglas Crockord, 62)"),
      database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)"),
      database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)")
    ]);

    const result = await database.execute('select name, age from author where id = 2');

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
})()