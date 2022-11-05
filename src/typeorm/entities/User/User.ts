import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { IUserDTO } from "./IUserDTO";

/**
 * Entidade de usuário.
 */
@Entity("users")
export class User implements IUserDTO {
  /**
   * ID do usuário.
   */
  @PrimaryColumn("uuid")
  id: string;

  /**
   * Nome do usuário.
   */
  @Column()
  name: string;

  /**
   * Data de cadastro do usuário.
   */
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
