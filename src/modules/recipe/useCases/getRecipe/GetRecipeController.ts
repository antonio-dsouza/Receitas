import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetRecipeUseCase } from "./GetRecipeUseCase";

class GetRecipeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    if (!id) {
      throw new AppError("Invalid params!");
    }

    const getRecipeUseCase = container.resolve(GetRecipeUseCase);

    const result = await getRecipeUseCase.execute({ id: parseInt(id) });

    return response.json(result);
  }
}

export { GetRecipeController };
