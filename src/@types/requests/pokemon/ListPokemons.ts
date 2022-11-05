import { IPokemonDTO } from "@backend-typeorm/entities/Pokemon/IPokemonDTO";
import { IRequest } from "@backend-types/IRequest";

/**
 * Status da requisição de listagem de Pokémons.
 */
export enum ListPokemonsRequestStatus {

}

/**
 * Request de listagem de Pokémons.
 */
export interface IListPokemonsRequest extends IRequest {
  /**
   * Limites de Pokémons a serem retornados.
   */
  limit?: number;

  /**
   * Índice do primeiro Pokémon a ser retornado.
   */
  offset?: number;
}

/**
 * Resposta da requisição de listagem de Pokémons.
 */
export interface IListPokemonsResponse {
  /**
   * Lista de Pokémons.
   */
  pokemons: IPokemonDTO[];

  /**
   * Total de Pokémons registrados.
   */
  count: number;
}
