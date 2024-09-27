import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { basename } from "path";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const image = request.file ? { file_path: basename(request.file.path), type: "image" } : null;

    if (!title || !description) {
      throw new AppError("Invalid params!");
    }

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const result = await createCategoryUseCase.execute({
      title,
      description,
      image
    });

    return response.json(result);
  }
}

export { CreateCategoryController };
