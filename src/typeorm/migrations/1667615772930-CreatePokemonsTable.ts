import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class CreatePokemonsTable1667615772930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pokemons",
        columns: [
          new TableColumn({
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          }),
          new TableColumn({
            name: "name",
            type: "text",
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("pokemons");
  }
}
