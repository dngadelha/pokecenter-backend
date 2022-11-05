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
   * @param limit Limite de pokémons a serem retornados.
   * @param offset Índice do primeiro pokémon a ser retornado.
   */
  async findAllByUserId(userId: string, limit?: number, offset?: number): Promise<IPokemonDTO[]> {
    const tableName = this.getTableName();

    // Montar a consulta.
    let query = this.dataSource
      .createQueryBuilder()
      .select("*")
      .from("pokemons", "pokemons")
      .innerJoin(tableName, tableName, `${tableName}.pokemon_id = pokemons.id`)
      .where(`${tableName}.user_id = :userId`, { userId })
      .orderBy(`${tableName}.created_at`, "DESC");

    // Aplicar o limite.
    if (limit) query = query.limit(limit);

    // Aplicar o offset.
    if (offset) query = query.offset(offset);

    // Obter e retornar os dados.
    const result = await query.getMany();
    return result as IPokemonDTO[];
  }

  /**
   * Obtém a quantidade de Pokémons capturados por um usuário.
   * @param userId ID do usuário.
   */
  countByUserId(userId: string): Promise<number> {
    return this.repository.count({
      where: {
        user_id: userId,
      },
    });
  }
}
