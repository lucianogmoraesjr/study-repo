export class Parser {
  constructor() {
    this.commands = new Map([
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
  }

  parse(statement) {
    for (let [command, regex] of this.commands) {
      const parsedStatement = statement.match(regex);

      if (parsedStatement) {
        return { command, parsedStatement };
      }
    }
  }
}