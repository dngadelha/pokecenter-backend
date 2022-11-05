import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class CreateUsersTable1667615900078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          new TableColumn({
            name: "id",
            type: "uuid",
            isPrimary: true,
          }),
          new TableColumn({
            name: "name",
            type: "text",
          }),
          new TableColumn({
            name: "created_at",
            type: "timestamp",
            default: "now()",
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
