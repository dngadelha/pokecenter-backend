import { IPokemonDTO } from "@backend-typeorm/entities/Pokemon/IPokemonDTO";
import { IUserPokemonDTO } from "../../entities/UserPokemon/IUserPokemonDTO";
import { UserPokemon } from "../../entities/UserPokemon/UserPokemon";
import { IBaseRepository } from "../IBaseRepository";

/**
 * Interface base do repositório de Pokémons capturados.
 */
export interface IUsersPokemonsRepository extends IBaseRepository<UserPokemon, IUserPokemonDTO> {
  /**
   * Obtém um Pokémon capturado pelo ID do usuário e ID do Pokémon.
   * @param userId ID do usuário.
   * @param pokemonId ID do Pokémon.
   */
  findOneByUserAndPokemon(userId: string, pokemonId: number): Promise<UserPokemon | null>;

  /**
   * Obtém todos os Pokémons capturados por um usuário.
   * @param userId ID do usuário.
   */
  findAllByUserId(userId: string): Promise<IPokemonDTO[]>;
}
