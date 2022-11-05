import { Entity, PrimaryColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { IUserPokemonDTO } from "./IUserPokemonDTO";

/**
 * Entidade de Pokémon capturado.
 */
@Entity("users_pokemons")
export class UserPokemon implements IUserPokemonDTO {
  /**
   * ID do registro.
   */
  @PrimaryColumn("uuid")
  id: string;

  /**
   * ID do usuário.
   */
  @Column("uuid")
  user_id: string;

  /**
   * ID do pokémon.
   */
  @Column()
  pokemon_id: number;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
