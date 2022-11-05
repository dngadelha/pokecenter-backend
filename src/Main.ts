import "reflect-metadata";
import "./container";

import cors from "cors";
import "express-async-errors";
import type { NextFunction, Request, Response } from "express";
import express from "express";

import { AppDataSource } from "./typeorm/DataSource";
import { BackendError } from "./errors/BackendError";
import { BaseRequestStatus } from "@backend-types/IRequest";
import { ApiRoutes } from "./routes";

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

// Registrar callback de página não encontrada no Express.
app.use((_request: Request, response: Response, _next: NextFunction) => {
  return response.status(404).json({
    status: BaseRequestStatus.NotFound,
  });
});

// Registrar callback de erro no Express.
app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof BackendError) {
    return response.status(err.statusCode).json({
      status: BaseRequestStatus.Error,
      message: err.message,
    });
  }

  return response.status(500).send();
});

// Criar conexão com o banco de dados.
AppDataSource.initialize()
  .then(() => {
    // Iniciar Express.
    app.listen(5000, () => {
      console.log("Servidor iniciado na porta 5000");
    });
  }).catch(error => {
    console.error(error);
    process.exit(1);
  });
