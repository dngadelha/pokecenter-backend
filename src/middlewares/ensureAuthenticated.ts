import env from "@cubos/env";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthenticationRequiredError } from "src/errors/AuthenticationRequiredError";

/**
 * Middleware para exigir autenticação nas rotas do backend.
 */
export function ensureAuthenticated(
  request: Request,
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

    // Guardar o ID do usuário na requisição.
    request.userId = id;

    next();
  } catch (e) {
    // Falha na autenticação.
    throw new AuthenticationRequiredError(request);
  }
}
