import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { basename } from "path";

import { CreateRecipeUseCase } from "./CreateRecipeUseCase";

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

class CreateRecipeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      ingredients,
      portion,
      preparation,
      adicional_information,
      cooking_hours,
      video,
    } = request.body;
    const user_id = request.userAuthenticated;
    let categories = [1];

    const files = request.files
      ? (request.files as MulterFile[]).map((file) => ({
          file_path: basename(file.path),
          type: file.mimetype.startsWith("video/") ? "video" : "image",
        }))
      : null;

    // if (!title || !description || !ingredients || !portion || !preparation || !cooking_hours || !files || !video) {
    //   throw new AppError("Invalid params!");
    // }

    const createRecipeUseCase = container.resolve(CreateRecipeUseCase);

    const result = await createRecipeUseCase.execute({
      title,
      description,
      ingredients,
      portion,
      preparation,
      adicional_information,
      cooking_hours,
      files,
      user_id,
      video,
      categories: categories,
    });

    return response.json(result);
  }
}

export { CreateRecipeController };
