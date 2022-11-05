import { IPokemonDTO } from "@backend-typeorm/entities/Pokemon/IPokemonDTO";
import { IRequest } from "@backend-types/IRequest";

/**
 * Status da requisição de listagem de Pokémons capturados pelo usuário.
 */
export enum ListUserPokemonsRequestStatus {

}

/**
 * Request de listagem de Pokémons capturados pelo usuário.
 */
export interface IListUserPokemonsRequest extends IRequest {

}

/**
 * Resposta da requisição de listagem de Pokémons capturados pelo usuário.
 */
export interface IListUserPokemonsResponse {
  /**
   * Lista de Pokémons capturados pelo usuário.
   */
  pokemons: IPokemonDTO[];
}
