import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListUserPokemonsUseCase } from "./ListUserPokemonsUseCase";

export class ListUserPokemonsController {
  async handle(request: Request, response: Response) {
    const useCase = container.resolve(ListUserPokemonsUseCase);
    const useCaseResponse = await useCase.execute({
      ...request.body,
      userId: request.userId,
    });

    return response.status(200).json(useCaseResponse);
  }
}
