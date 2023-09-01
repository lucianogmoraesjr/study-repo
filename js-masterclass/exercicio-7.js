const DatabaseError = function (statement, message) {
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
  select(statement) {
    const regexp = /select (.+) from ([a-z]+)(?: where (.+))?/;

    const parsedStatement = statement.match(regexp);

    let [, columns, tableName, whereClause] = parsedStatement;

    const parsedColumns = columns.split(', ');

    let rows = this.tables[tableName].data;

    if (whereClause) {
      const [columnWhere, valueWhere] = whereClause.split(" = ");
      rows = rows.filter(row => row[columnWhere] === valueWhere)
    }

    rows = rows.map(row => {
      let selectedRow = {};
      parsedColumns.forEach(column => selectedRow[column] = row[column]);
      return selectedRow;
    })

    return rows;
  },
  delete(statement) {
    const regexp = /delete from ([a-z]+)(?: where (.+))?/;

    const parsedStatement = statement.match(regexp);

    const [, tableName, whereClause] = parsedStatement;

    if (whereClause) {
      const [columnWhere, valueWhere] = whereClause.split(" = ");

      this.tables[tableName].data = this.tables[tableName].data.filter(row => row[columnWhere] !== valueWhere);
    } else {
      this.tables[tableName].data = [];
    }
  },
  execute(statement) {
    if (statement.startsWith('create table')) {
      return this.createTable(statement);
    };

    if (statement.startsWith('insert')) {
      return this.insert(statement);
    };
    if (statement.startsWith('select')) {
      return this.select(statement);
    };
    if (statement.startsWith('delete')) {
      return this.delete(statement);
    };

    throw new DatabaseError(statement, `Syntax error: ${statement}`)
  }
};

try {
  database.execute("create table author (id number, name string, age number, city string, state string, country string)");
  database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
  database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
  database.execute("delete from author where id = 2");
  console.log(JSON.stringify(database.execute("select name, age from author"), null, 2));
} catch (e) {
  console.log(e.message);
}
