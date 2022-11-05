import { AppDataSource } from "../../DataSource";
import { IUserDTO } from "../../entities/User/IUserDTO";
import { User } from "../../entities/User/User";
import { BaseRepository } from "../BaseRepository";
import { IUsersRepository } from "./IUsersRepository";

/**
 * Repositório de usuários.
 */
export class UsersRepository extends BaseRepository<User, IUserDTO> implements IUsersRepository {
  constructor() {
    super(AppDataSource, User);
  }

  /**
   * Obtém o nome da tabela relacionada ao repositório.
   */
  getTableName(): string {
    return "users";
  }
}
