import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListPokemonsUseCase } from "./ListPokemonsUseCase";

export class ListPokemonsController {
  async handle(request: Request, response: Response) {
    const useCase = container.resolve(ListPokemonsUseCase);
    const useCaseResponse = await useCase.execute({
      ...request.body,
      userId: request.userId,
    });

    return response.status(200).json(useCaseResponse);
  }
}
