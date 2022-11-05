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
   * ID do usuário que fez a requisição.
   */
  userId?: string;
}
