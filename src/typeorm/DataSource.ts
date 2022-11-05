import { DataSource } from "typeorm";
import entities from "./entities";

/**
 * Conexão com o banco de dados do projeto.
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "xFpKMyJTm02LMvf9AUaH2caZ8VUoJve0",
  database: "pokecenter",
  synchronize: false,
  logging: true,
  entities,
  subscribers: [],
  migrations: ["./src/typeorm/migrations/**/*.ts"],
});
