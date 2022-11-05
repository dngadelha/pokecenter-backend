/**
 * Classe base de erros do backend.
 */
export class BackendError extends Error {
  /**
   * Código de status HTTP.
   */
  public readonly statusCode: number;

  /**
   *
   * @param message Mensagem de erro.
   * @param statusCode Código de status HTTP.
   */
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
