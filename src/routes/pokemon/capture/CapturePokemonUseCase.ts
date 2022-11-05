import { inject, injectable } from "tsyringe";
import { IResponse } from "@backend-types/IResponse";
import { ICapturePokemonRequest, ICapturePokemonResponse, CapturePokemonRequestStatus } from "@backend-types/requests/pokemon/CapturePokemon";
import { IPokemonsRepository } from "@backend-typeorm/repositories/Pokemon/IPokemonsRepository";
import { BaseRequestStatus } from "@backend-types/IRequest";
import { IUsersPokemonsRepository } from "@backend-typeorm/repositories/UserPokemon/IUsersPokemonsRepository";

@injectable()
export class CapturePokemonUseCase {
  constructor(
    @inject("PokemonsRepository")
    private pokemonsRepository: IPokemonsRepository,
    @inject("UsersPokemonsRepository")
    private usersPokemonsRepository: IUsersPokemonsRepository,
  ) { }

  async execute({
    user,
    name,
  }: ICapturePokemonRequest) {
    const response: IResponse<CapturePokemonRequestStatus, ICapturePokemonResponse> = {
      status: BaseRequestStatus.Success,
    };

    // Obter o Pókemon pelo seu nome.
    const pokemon = await this.pokemonsRepository.findOneByName(name);

    // Verificar se o Pokémon não foi encontrado.
    if (!pokemon) {
      response.status = CapturePokemonRequestStatus.PokemonNotFound;
      return response;
    }

    // Obter o Pokémon capturado pelo ID do usuário e ID do Pokémon.
    const userPokemon = await this.usersPokemonsRepository.findOneByUserAndPokemon(user!.id, pokemon.id);

    // Verificar se o Pokémon já foi capturado pelo usuário.
    if (userPokemon) {
      response.status = CapturePokemonRequestStatus.PokemonAlreadyCaptured;
      return response;
    }

    // Capturar o Pokémon.
    await this.usersPokemonsRepository.create({
      user_id: user!.id,
      pokemon_id: pokemon.id,
    });

    // Retornar o Pokémon capturado.
    response.result = {
      pokemon,
    };

    return response;
  }
}
