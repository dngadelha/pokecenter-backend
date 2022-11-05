import "reflect-metadata";
import "./container";

import cors from "cors";
import "express-async-errors";
import type { Request, Response } from "express";
import express from "express";

import { AppDataSource } from "./typeorm/DataSource";
import { BackendError } from "./errors/BackendError";
import { BaseRequestStatus } from "@backend-types/IRequest";
import { ApiRoutes } from "./routes";

// Criar conexão com o banco de dados.
AppDataSource.initialize();

// Criar a instância do Express.
const app = express();

// Definir os middlewares do Express.
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Registrar rotas da API.
app.use(ApiRoutes);

// Registrar callback de erro no Express.
app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof BackendError) {
    return response.status(err.statusCode).json({
      status: BaseRequestStatus.Error,
      message: err.message,
    });
  }

  return response.status(500).send();
});

// Iniciar Express.
app.listen(80);
