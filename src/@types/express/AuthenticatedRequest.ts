import { IUserDTO } from "@backend-typeorm/entities/User/IUserDTO";
import { Request } from "express";

/**
 * Representa uma requisição autenticada.
 */
export type AuthenticatedRequest = Request & {
  /**
   * Entidade do usuário logado.
   */
  user?: IUserDTO;
};
