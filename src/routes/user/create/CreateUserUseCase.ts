import env from "@cubos/env";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";

import { IResponse } from "@backend-types/IResponse";
import { ICreateUserRequest, ICreateUserResponse, CreateUserRequestStatus } from "@backend-types/requests/user/CreateUser";
import { IUsersRepository } from "@backend-typeorm/repositories/User/IUsersRepository";
import { BaseRequestStatus } from "@backend-types/IRequest";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    name,
  }: ICreateUserRequest) {
    const response: IResponse<CreateUserRequestStatus, ICreateUserResponse> = {
      status: BaseRequestStatus.Success,
    };

    // Verificar se o nome está vazio.
    if (!name || name.trim().length === 0) {
      response.status = CreateUserRequestStatus.EmptyName;
      return response;
    }

    // Criar o usuário.
    const user = await this.usersRepository.create({
      name: name.trim(),
    });

    // Criar o token da sessão.
    const token = sign(
      /* Payload: */ {
        id: user.id,
        name: user.name,
      },
      /* Private Key: */ env.SESSION_TOKEN_SECRET_KEY,
      /* Options: */ {
        subject: user.id,
      },
    );

    // Montar resultado da resposta.
    response.result = {
      token,
    };

    return response;
  }
}
