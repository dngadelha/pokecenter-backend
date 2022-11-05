/**
 * Objeto de Transferência de Dados (DTO) da entidade de Pokémon capturado.
 */
export interface IUserPokemonDTO {
  /**
   * ID do registro.
   */
  id?: string;

  /**
   * ID do usuário.
   */
  user_id: string;

  /**
   * ID do pokémon.
   */
  pokemon_id: number;

  /**
   * Data de captura do pokémon.
   */
  created_at?: Date;
}
