import { AppDataSource } from "../../DataSource";
import { IPokemonDTO } from "../../entities/Pokemon/IPokemonDTO";
import { Pokemon } from "../../entities/Pokemon/Pokemon";
import { BaseRepository } from "../BaseRepository";
import { IPokemonsRepository } from "./IPokemonsRepository";

/**
 * Repositório de Pokémons.
 */
export class PokemonsRepository extends BaseRepository<Pokemon, IPokemonDTO> implements IPokemonsRepository {
  constructor() {
    super(AppDataSource, Pokemon);
  }

  /**
   * Obtém o nome da tabela relacionada ao repositório.
   */
  getTableName(): string {
    return "pokemons";
  }

  /**
   * Obtém um Pokémon pelo seu nome.
   * @param name Nome do Pokémon.
   */
  findOneByName(name: string): Promise<Pokemon | null> {
    return this.repository
      .createQueryBuilder(this.getTableName())
      .where("LOWER(name) = :name", { name: name.toLowerCase() })
      .getOne();
  }

  /**
   * Obtém todos os pokémons.
   * @param limit Limite de pokémons a serem retornados.
   * @param offset Índice do primeiro pokémon a ser retornado.
   */
  findAll(limit?: number, offset?: number): Promise<Pokemon[]> {
    return this.repository
      .createQueryBuilder(this.getTableName())
      .orderBy("id", "ASC")
      .limit(limit)
      .offset(offset)
      .getMany();
  }
}
