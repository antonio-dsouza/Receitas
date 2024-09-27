import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteRecipeUseCase } from "./DeleteRecipeUseCase";

class DeleteRecipeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      throw new AppError("Invalid params!");
    }

    const deleteRecipeUseCase = container.resolve(DeleteRecipeUseCase);

    await deleteRecipeUseCase.execute({ id: parseInt(id) });

    return response.send();
  }
}

export { DeleteRecipeController };
