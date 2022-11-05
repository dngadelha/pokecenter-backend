import { IPokemonDTO } from "@backend-typeorm/entities/Pokemon/IPokemonDTO";
import { AppDataSource } from "../../DataSource";
import { IUserPokemonDTO } from "../../entities/UserPokemon/IUserPokemonDTO";
import { UserPokemon } from "../../entities/UserPokemon/UserPokemon";
import { BaseRepository } from "../BaseRepository";
import { IUsersPokemonsRepository } from "./IUsersPokemonsRepository";

/**
 * Repositório de Pokémons capturados.
 */
export class UsersPokemonsRepository extends BaseRepository<UserPokemon, IUserPokemonDTO> implements IUsersPokemonsRepository {
  constructor() {
    super(AppDataSource, UserPokemon);
  }

  /**
   * Obtém o nome da tabela relacionada ao repositório.
   */
  getTableName(): string {
    return "users_pokemons";
  }

  /**
   * Obtém um Pokémon capturado pelo ID do usuário e ID do Pokémon.
   * @param userId ID do usuário.
   * @param pokemonId ID do Pokémon.
   */
  findOneByUserAndPokemon(userId: string, pokemonId: number): Promise<UserPokemon | null> {
    return this.repository.findOne({
      where: {
        user_id: userId,
        pokemon_id: pokemonId
      },
    });
  }

  /**
   * Obtém todos os Pokémons capturados por um usuário.
   * @param userId ID do usuário.
   */
  async findAllByUserId(userId: string): Promise<IPokemonDTO[]> {
    const tableName = this.getTableName();
    const query = await this.dataSource
      .createQueryBuilder()
      .select("*")
      .from("pokemons", "pokemons")
      .innerJoin(this.getTableName(), `${tableName}.pokemon_id`, "pokemons.id")
      .where(`${tableName}.user_id = :userId`, { userId })
      .getMany();

    return query as IPokemonDTO[];
  }
}
