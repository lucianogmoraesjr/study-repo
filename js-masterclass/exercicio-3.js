const database = {
  tables: {},
  createTable(statement) {
    const regexp = /create table ([a-z]+) \((.+)\)/;

    const parsedStatement = statement.match(regexp);

    const tableName = parsedStatement[1];

    this.tables[tableName] = {
      columns: {},
      data: [],
    }

    const columns = parsedStatement[2].split(', ');

    for (const column of columns) {
      const parsedColumn = column.split(' ');
      const columnName = parsedColumn[0];
      const columnType = parsedColumn[1];
    
      this.tables[tableName].columns[columnName] = columnType;
    };
  },
  execute(statement) {
    if (statement.startsWith('create table')) {
      return this.createTable(statement);
    }
  }
};

database.execute("create table author (id number, name string, age number, city string, state string, country string)");

console.log(JSON.stringify(database, null, 2));

