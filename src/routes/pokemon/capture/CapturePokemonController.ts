import { container } from "tsyringe";
import { Request, Response } from "express";
import { CapturePokemonUseCase } from "./CapturePokemonUseCase";

export class CapturePokemonController {
  async handle(request: Request, response: Response) {
    const useCase = container.resolve(CapturePokemonUseCase);
    const useCaseResponse = await useCase.execute({
      ...request.body,
      userId: request.userId,
    });

    return response.status(200).json(useCaseResponse);
  }
}
