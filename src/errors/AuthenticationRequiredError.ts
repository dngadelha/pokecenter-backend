import { Request } from "express";
import { BackendError } from "./BackendError";

/**
 * Erro ocorrido quando alguém tenta acessar uma rota que requer autenticação.
 */
export class AuthenticationRequiredError extends BackendError {
  constructor(request: Request) {
    super("Authentication required", 401);
  }
}
