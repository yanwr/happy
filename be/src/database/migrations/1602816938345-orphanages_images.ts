import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class orphanagesImages1602816938345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "orphanage_images",
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
            name: "path",
            type: "varchar"
          },
          {
            name:"orphanage_id",
            type: "integer"
          }
        ],
        foreignKeys: [
          {
            name: "ImageOrphanage",
            columnNames: ['orphanage_id'],
            referencedTableName: 'orphanage',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("orphanage_images");
    }
}
