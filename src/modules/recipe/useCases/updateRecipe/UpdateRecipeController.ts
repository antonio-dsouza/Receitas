import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { basename } from "path";

import { UpdateRecipeUseCase } from "./UpdateRecipeUseCase";

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

class UpdateRecipeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description, ingredients, portion, preparation, adicional_information, cooking_hours } = request.body;
    const user_id = request.userAuthenticated;

    const files = request.files
    ? (request.files as MulterFile[]).map((file) => ({
        file_path: basename(file.path),
        type: file.mimetype.startsWith('video/') ? 'video' : 'image',
      }))
    : null;

    if (!id) {
      throw new AppError("Invalid params!");
    }

    const updateRecipeUseCase = container.resolve(UpdateRecipeUseCase);

    await updateRecipeUseCase.execute({
      id: parseInt(id),
      user_id,
      title,
      description,
      ingredients,
      portion,
      preparation,
      adicional_information,
      cooking_hours,
      files
    });

    return response.send();
  }
}

export { UpdateRecipeController };
