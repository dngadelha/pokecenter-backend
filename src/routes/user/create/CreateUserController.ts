import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const useCase = container.resolve(CreateUserUseCase);
    const useCaseResponse = await useCase.execute({
      ...request.body,
    });

    return response.status(200).json(useCaseResponse);
  }
}
