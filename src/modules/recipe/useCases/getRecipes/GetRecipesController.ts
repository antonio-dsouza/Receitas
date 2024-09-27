import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetRecipesUseCase } from "./GetRecipesUseCase";

class GetRecipesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const category_id = request.query.category;
    
    const getRecipesUseCase = container.resolve(GetRecipesUseCase);

    const result = await getRecipesUseCase.execute({ category_id });

    return response.json(result);
  }
}

export { GetRecipesController };
