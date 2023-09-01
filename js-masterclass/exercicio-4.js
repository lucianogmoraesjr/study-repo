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
  execute(statement) {
    if (statement.startsWith('create table')) {
      return this.createTable(statement);
    };

    throw new DatabaseError(statement, `Syntax error: ${statement}`)
  }
};

try {
  database.execute("select id, name from author");
} catch(e) {
  console.log(e.message);
}
