import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class CreateUsersPokemonsTable1667615948081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_pokemons",
        columns: [
          new TableColumn({
            name: "id",
            type: "uuid",
            isPrimary: true,
          }),
          new TableColumn({
            name: "user_id",
            type: "uuid",
          }),
          new TableColumn({
            name: "pokemon_id",
            type: "integer",
          }),
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
          }),
          new TableForeignKey({
            columnNames: ["pokemon_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "pokemons",
            onDelete: "CASCADE",
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
