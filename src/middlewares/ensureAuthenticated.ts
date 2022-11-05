import env from "@cubos/env";
import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@backend-typeorm/repositories/User/UsersRepository";
import { AuthenticatedRequest } from "@backend-types/express/AuthenticatedRequest";
import { AuthenticationRequiredError } from "src/errors/AuthenticationRequiredError";

/**
 * Middleware para exigir autenticação nas rotas do backend.
 */
export async function ensureAuthenticated(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) {
  // Obter o cabeçalho "Authorization".
  const authHeader = request.get("Authorization");

  // Verificar se não especificou o cabeçalho "Authorization".
  if (!authHeader) {
    // Falha na autenticação.
    throw new AuthenticationRequiredError(request);
  }

  try {
    // Obter somente o token do cabeçalho.
    const [, token] = authHeader.split(" ");

    // Verificar o token JWT.
    const { id } = verify(
      token,
      env.SESSION_TOKEN_SECRET_KEY
    ) as any;

    // Obter o usuário no banco de dados.
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    // Verificar se o usuário não foi encontrado.
    if (!user) {
      // Falha na autenticação.
      throw new AuthenticationRequiredError(request);
    }

    // Guardar a instância do usuário na requisição.
    request.user = user;

    next();
  } catch (e) {
    // Falha na autenticação.
    throw new AuthenticationRequiredError(request);
  }
}
