import env from "@cubos/env";
import { DataSource } from "typeorm";
import entities from "./entities";

/**
 * Conexão com o banco de dados do projeto.
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.POSTGRES_HOST ?? "localhost",
  port: 5432,
  username: env.POSTGRES_USER ?? "postgres",
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities,
  subscribers: [],
  migrations: ["./src/typeorm/migrations/**/*.ts"],
});
