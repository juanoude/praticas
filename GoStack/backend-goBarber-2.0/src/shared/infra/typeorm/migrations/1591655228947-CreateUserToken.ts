import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserToken1591655228947
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'user_token',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'TokenUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_token');
  }
}
