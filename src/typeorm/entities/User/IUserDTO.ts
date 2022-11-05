/**
 * Objeto de Transferência de Dados (DTO) da entidade de usuário.
 */
export interface IUserDTO {
  /**
   * ID do usuário.
   */
  id?: string;

  /**
   * Nome do usuário.
   */
  name: string;

  /**
   * Data de cadastro do usuário.
   */
  created_at?: Date;
}
