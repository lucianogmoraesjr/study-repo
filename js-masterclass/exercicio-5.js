const DatabaseError = function(statement, message) {
  this.statement = statement;
  this.message = message;
};

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
  insert(statement) {
    const regexp = /insert into ([a-z]+) \((.+)\) values \((.+)\)/;

    const parsedStatement = statement.match(regexp);

    const tableName = parsedStatement[1];
    const columns = parsedStatement[2];
    const values = parsedStatement[3];

    const parsedColumns = columns.split(', ');
    const parsedValues = values.split(', ');

    let row = {};
    
    for (let i = 0; i < parsedColumns.length; i++) {
      const column = parsedColumns[i];
      const value = parsedValues[i];

      row[column] = value;
    };

    this.tables[tableName].data.push(row);
  },
  execute(statement) {
    if (statement.startsWith('create table')) {
      return this.createTable(statement);
    };

    if (statement.startsWith('insert')) {
      return this.insert(statement);
    };

    throw new DatabaseError(statement, `Syntax error: ${statement}`)
  }
};

try {
  database.execute("create table author (id number, name string, age number, city string, state string, country string)");
  database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
  console.log(JSON.stringify(database, null, 2))
} catch(e) {
  console.log(e.message);
}
