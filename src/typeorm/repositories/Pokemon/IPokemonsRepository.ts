import { IPokemonDTO } from "../../entities/Pokemon/IPokemonDTO";
import { Pokemon } from "../../entities/Pokemon/Pokemon";
import { IBaseRepository } from "../IBaseRepository";

/**
 * Interface base do repositório de Pokémons.
 */
export interface IPokemonsRepository extends IBaseRepository<Pokemon, IPokemonDTO> {
  /**
   * Obtém um Pokémon pelo seu nome.
   * @param name Nome do Pokémon.
   */
  findOneByName(name: string): Promise<Pokemon | null>;

  /**
   * Obtém todos os pokémons.
   * @param limit Limite de pokémons a serem retornados.
   * @param offset Índice do primeiro pokémon a ser retornado.
   */
  findAll(limit?: number, offset?: number): Promise<Pokemon[]>;
}
