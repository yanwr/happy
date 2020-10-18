import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class orphanages1602729910981 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "orphanage",
      columns: [
        {
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
          name: 'id',
          type: 'integer',
          unsigned: true,
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2
        },
        {
          name: 'descriptions',
          type: 'text',
        },
        {
          name: 'instructions',
          type: 'text'
        },
        {
          name: 'opening_hours',
          type: 'varchar',
          default: false
        },
        {
          name: 'open_on_weekend',
          type: 'boolean',
          default: false
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanage');
  }
}
