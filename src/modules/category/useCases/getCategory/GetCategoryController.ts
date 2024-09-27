import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCategoryUseCase } from "./GetCategoryUseCase";

class GetCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    if (!id) {
      throw new AppError("Invalid params!");
    }

    const getCategoryUseCase = container.resolve(GetCategoryUseCase);

    const result = await getCategoryUseCase.execute({ id: parseInt(id) });

    return response.json(result);
  }
}

export { GetCategoryController };
