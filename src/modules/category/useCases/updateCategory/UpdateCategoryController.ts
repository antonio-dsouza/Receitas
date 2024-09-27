import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      title,
      description,
    } = request.body;

    if (!id) {
      throw new AppError("Invalid params!");
    }

    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);

    await updateCategoryUseCase.execute({
      id: parseInt(id),
      title,
      description,
    });

    return response.send();
  }
}

export { UpdateCategoryController };
