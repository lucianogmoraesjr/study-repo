import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class alterStatementForTransferOperation1684193392740 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn('statements', 'type', new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['deposit', 'withdraw', 'transfer'],
      }))

      await queryRunner.addColumn('statements', new TableColumn({
        name: 'sender_id',
        type: 'uuid',
        isNullable: true,
      }))

      await queryRunner.createForeignKey('statements', new TableForeignKey({
        name: 'FKTransferSender',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['sender_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('statements', 'FKTransferSender');
      await queryRunner.dropColumn('statements', 'sender_id');
      await queryRunner.changeColumn('statements', 'type', new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['deposit', 'withdraw'],
      }));
    }

}
