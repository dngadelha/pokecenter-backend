import { inject, injectable } from "tsyringe";

import { IResponse } from "@backend-types/IResponse";
import { IListUserPokemonsRequest, IListUserPokemonsResponse, ListUserPokemonsRequestStatus } from "@backend-types/requests/user/ListUserPokemons";
import { IUsersPokemonsRepository } from "@backend-typeorm/repositories/UserPokemon/IUsersPokemonsRepository";
import { BaseRequestStatus } from "@backend-types/IRequest";

@injectable()
export class ListUserPokemonsUseCase {
  constructor(
    @inject("UsersPokemonsRepository")
    private usersPokemonsRepository: IUsersPokemonsRepository,
  ) { }

  async execute({
    user,
  }: IListUserPokemonsRequest) {
    const response: IResponse<ListUserPokemonsRequestStatus, IListUserPokemonsResponse> = {
      status: BaseRequestStatus.Success,
    };

    // Obter todos os pokémons do usuário.
    const pokemons = await this.usersPokemonsRepository.findAllByUserId(user!.id);

    // Montar resultado da resposta.
    response.result = {
      pokemons,
    };

    return response;
  }
}
