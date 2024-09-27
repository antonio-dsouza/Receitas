import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { RegisterUserUseCase } from "./RegisterUserUseCase";

class RegisterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
    } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Invalid params!");
    }

    const registerUserUseCase = container.resolve(RegisterUserUseCase);

    const result = await registerUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.json(result);
  }
}

export { RegisterUserController };
