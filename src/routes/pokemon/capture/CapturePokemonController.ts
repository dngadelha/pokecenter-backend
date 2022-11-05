import { container } from "tsyringe";
import { Response } from "express";
import { AuthenticatedRequest } from "@backend-types/express/AuthenticatedRequest";
import { CapturePokemonUseCase } from "./CapturePokemonUseCase";

export class CapturePokemonController {
  async handle(request: AuthenticatedRequest, response: Response) {
    const useCase = container.resolve(CapturePokemonUseCase);
    const useCaseResponse = await useCase.execute({
      ...request.body,
      user: request.user,
    });

    return response.status(200).json(useCaseResponse);
  }
}
