import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCategoriesUseCase } from "./GetCategoriesUseCase";

class GetCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getCategoriesUseCase = container.resolve(GetCategoriesUseCase);

    const result = await getCategoriesUseCase.execute();

    return response.json(result);
  }
}

export { GetCategoriesController };
