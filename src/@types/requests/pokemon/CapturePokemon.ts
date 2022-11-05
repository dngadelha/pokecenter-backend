import { IPokemonDTO } from "@backend-typeorm/entities/Pokemon/IPokemonDTO";
import { IRequest } from "@backend-types/IRequest";

/**
 * Status da requisição de captura de Pokémons.
 */
export enum CapturePokemonRequestStatus {
  /**
   * Indica que o Pokémon não foi encontrado.
   */
  PokemonNotFound = "pokemon_not_found",

  /**
   * Indica que o Pokémon já foi capturado pelo usuário.
   */
  PokemonAlreadyCaptured = "pokemon_already_captured",
}

/**
 * Request de captura de Pokémons.
 */
export interface ICapturePokemonRequest extends IRequest {
  /**
   * Nome do Pokémon.
   */
  name: string;
}

/**
 * Resposta da requisição de captura de Pokémons.
 */
export interface ICapturePokemonResponse {
  /**
   * Pokémon capturado.
   */
  pokemon: IPokemonDTO;
}
