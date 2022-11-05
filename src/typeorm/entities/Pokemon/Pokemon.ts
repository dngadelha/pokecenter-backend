import { Entity, PrimaryColumn, Column } from "typeorm";
import { IPokemonDTO } from "./IPokemonDTO";

/**
 * Entidade de Pokémon.
 */
@Entity("pokemons")
export class Pokemon implements IPokemonDTO {
  /**
   * ID do Pokémon.
   */
  @PrimaryColumn({ generated: "increment" })
  id: number;

  /**
   * Nome do Pokémon.
   */
  @Column()
  name: string;
}
