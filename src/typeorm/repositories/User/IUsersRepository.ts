import { IUserDTO } from "../../entities/User/IUserDTO";
import { User } from "../../entities/User/User";
import { IBaseRepository } from "../IBaseRepository";

/**
 * Interface base do repositório de usuários.
 */
export interface IUsersRepository extends IBaseRepository<User, IUserDTO> {

}
