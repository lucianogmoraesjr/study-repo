const DatabaseError = function (statement, message) {
  this.statement = statement;
  this.message = message;
};

const Parser = function () {
  const commands = new Map([
    [
      'createTable',
      /create table ([a-z]+) \((.+)\)/
    ],
    [
      'insert',
      /insert into ([a-z]+) \((.+)\) values \((.+)\)/
    ],
    [
      'select',
      /select (.+) from ([a-z]+)(?: where (.+))?/
    ],
    [
      'delete',
      /delete from ([a-z]+)(?: where (.+))?/
    ]
  ]);

  this.parse = function (statement) {
    for (let [command, regexp] of commands) {
      const parsedStatement = statement.match(regexp);

      if (parsedStatement) {
        return {
          command,
          parsedStatement
        }
      }
    }
  };
}

const database = {
  tables: {},
  parser: new Parser(),
  createTable(parsedStatement) {
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
  insert(parsedStatement) {
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
  select(parsedStatement) {
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
  delete(parsedStatement) {
    const [, tableName, whereClause] = parsedStatement;

    if (whereClause) {
      const [columnWhere, valueWhere] = whereClause.split(" = ");

      this.tables[tableName].data = this.tables[tableName].data.filter(row => row[columnWhere] !== valueWhere);
    } else {
      this.tables[tableName].data = [];
    }
  },
  execute(statement) {
    const result = this.parser.parse(statement);

    if (result) {
      return this[result.command](result.parsedStatement);
    }

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
