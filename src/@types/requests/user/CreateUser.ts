import { IRequest } from "@backend-types/IRequest";

/**
 * Status da requisição de criação de usuário.
 */
export enum CreateUserRequestStatus {
  /**
   * Indica que o nome do usuário está vazio.
   */
  EmptyName = "empty_name",
}

/**
 * Request de criação de usuário.
 */
export interface ICreateUserRequest extends IRequest {
  /**
   * Nome do usuário.
   */
  name: string;
}

/**
 * Resposta da requisição de criação de usuário.
 */
export interface ICreateUserResponse {
  /**
   * Token da sessão do usuário.
   */
  token: string;
}
