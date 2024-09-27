import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { basename } from "path";

import { CreateFavoriteUseCase } from "./CreateFavoriteUseCase";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

class CreateFavoriteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { recipe_id } = request.body;
    const user_id = request.userAuthenticated;

    if (!recipe_id || !user_id) {
      throw new AppError("Invalid params!");
    }

    const createFavoriteUseCase = container.resolve(CreateFavoriteUseCase);

    const result = await createFavoriteUseCase.execute({
      recipe_id
      user_id
    });

    return response.json(result);
  }
}

export { CreateFavoriteController };
