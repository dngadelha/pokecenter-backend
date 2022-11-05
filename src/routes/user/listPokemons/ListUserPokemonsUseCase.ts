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
    limit,
    offset,
  }: IListUserPokemonsRequest) {
    const response: IResponse<ListUserPokemonsRequestStatus, IListUserPokemonsResponse> = {
      status: BaseRequestStatus.Success,
    };

    // Obter todos os pokémons do usuário.
    const pokemons = await this.usersPokemonsRepository.findAllByUserId(user!.id, limit, offset);

    // Obter o total de pokémons capturados pelo usuário.
    const count = await this.usersPokemonsRepository.countByUserId(user!.id);

    // Montar resultado da resposta.
    response.result = {
      pokemons,
      count,
    };

    return response;
  }
}
