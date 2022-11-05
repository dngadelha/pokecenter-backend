import { inject, injectable } from "tsyringe";
import { IResponse } from "@backend-types/IResponse";
import { IListPokemonsRequest, IListPokemonsResponse, ListPokemonsRequestStatus } from "@backend-types/requests/pokemon/ListPokemons";
import { IPokemonsRepository } from "@backend-typeorm/repositories/Pokemon/IPokemonsRepository";
import { BaseRequestStatus } from "@backend-types/IRequest";

@injectable()
export class ListPokemonsUseCase {
  constructor(
    @inject("PokemonsRepository")
    private pokemonsRepository: IPokemonsRepository,
  ) { }

  async execute({
    limit,
    offset,
  }: IListPokemonsRequest) {
    const response: IResponse<ListPokemonsRequestStatus, IListPokemonsResponse> = {
      status: BaseRequestStatus.Success,
    };

    // Obter todos os pokémons.
    const pokemons = await this.pokemonsRepository.findAll(limit, offset);

    // Obter total de pokémons cadastrados.
    const count = await this.pokemonsRepository.countAll();

    // Montar resultado da resposta.
    response.result = {
      pokemons,
      count,
    };

    return response;
  }
}
