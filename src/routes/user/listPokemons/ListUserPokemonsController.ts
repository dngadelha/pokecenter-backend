import { container } from "tsyringe";
import { Response } from "express";
import { AuthenticatedRequest } from "@backend-types/express/AuthenticatedRequest";
import { ListUserPokemonsUseCase } from "./ListUserPokemonsUseCase";

export class ListUserPokemonsController {
  async handle(request: AuthenticatedRequest, response: Response) {
    const useCase = container.resolve(ListUserPokemonsUseCase);
    const useCaseResponse = await useCase.execute({
      ...request.body,
      user: request.user,
    });

    return response.status(200).json(useCaseResponse);
  }
}
