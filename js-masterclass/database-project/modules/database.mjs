import { DatabaseError } from "./database-error.mjs";
import { Parser } from './parser.mjs';

export class Database {
  constructor() {
    this.tables = {};
    this.parser = new Parser()
  }

  createTable(parsedStatement) {
    const [input, tableName, columns] = parsedStatement;

    const splittedColumns = columns.split(', ');

    this.tables[tableName] = {
      columns: {},
      data: []
    }

    for (const column of splittedColumns) {
      const [name, type] = column.split(' ');
      this.tables[tableName].columns[name] = type;
    };
  }

  insert(parsedStatement) {
    const [input, tableName, columns, values] = parsedStatement;

    const splittedColumns = columns.split(', ');

    const splittedValues = values.split(', ')

    const row = {};

    for (let i = 0; i <= splittedColumns.length - 1; i++) {
      row[splittedColumns[i]] = splittedValues[i];
    }

    this.tables[tableName].data.push(row);
  }

  select(parsedStatement) {
    const [input, columns, tableName, whereClause] = parsedStatement;

    const splittedColumns = columns.split(', ');

    let rows = this.tables[tableName].data;

    if (whereClause) {
      const [columnWhere, valueWhere] = whereClause.split(' = ');

      rows = rows.filter((row) => {
        return row[columnWhere] === valueWhere;
      });
    };

    rows = rows.map((row) => {
      let selectedRow = {};

      splittedColumns.forEach((column) => {
        selectedRow[column] = row[column]
      });

      return selectedRow;
    });

    return rows;
  }

  delete(parsedStatement) {
    const [input, tableName, whereClause] = parsedStatement;

    if (whereClause) {
      const [columnWhere, valueWhere] = whereClause.split(' = ');

      let rows = this.tables[tableName].data;

      rows = rows.filter((row) => {
        return row[columnWhere] !== valueWhere;
      })

      this.tables[tableName].data = rows;
    } else {
      this.tables[tableName].data = [];
    }

  }

  execute(statement) {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        const method = this.parser.parse(statement);
    
        if (method) {
          resolve(this[method.command](method.parsedStatement));
        }
    
        reject(new DatabaseError(statement, `Syntax error: '${statement}'`));
      }, 1000)

    });
  }
}