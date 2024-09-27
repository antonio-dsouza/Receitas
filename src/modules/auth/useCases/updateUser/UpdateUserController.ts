import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      email,
      password,
      group_id
    } = request.body;

    if (!id) {
      throw new AppError("Invalid params!");
    }

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({
      id: parseInt(id),
      name,
      email,
      password,
      group_id
    });

    return response.send();
  }
}

export { UpdateUserController };
