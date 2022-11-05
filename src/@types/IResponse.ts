import { BaseRequestStatus } from "./IRequest";

/**
 * Interface base das respostas do servidor.
 */
export interface IResponse<TStatus = string, TResult = any> {
  /**
   * Estado da operação.
   */
  status: BaseRequestStatus | TStatus;

  /**
   * Resultado da operação.
   */
  result?: TResult;

  /**
   * Detalhes do erro, se houver.
   */
  error?: string;
}
