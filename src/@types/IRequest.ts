import { IUserDTO } from "@backend-typeorm/entities/User/IUserDTO";

/**
 * Estado da requisição.
 */
export enum BaseRequestStatus {
  /**
   * Indica que a operação foi executada com sucesso no servidor.
   */
  Success = "success",

  /**
   * Indica que a operação deu erro interno no servidor.
   */
  Error = "error",
}

/**
 * Interface base das requisições do servidor.
 */
export interface IRequest {
  /**
   * Entidade do usuário que fez a requisição.
   */
  user?: IUserDTO;
}
