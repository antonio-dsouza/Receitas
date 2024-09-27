import { inject, injectable } from "tsyringe";

import { IRecipesRepository } from "../../repositories/IRecipesRepository";
import { AppError } from "@shared/errors/AppError";
import { IRecipeResponseDTO } from "@modules/recipe/dtos/IRecipeResponseDTO";

interface IRequestDTO {
  id: number;
}

@injectable()
class GetRecipeUseCase {
  constructor(
    @inject("RecipesRepository")
    private recipesRepository: IRecipesRepository,
  ) { }
  async execute({ id }: IRequestDTO): Promise<IRecipeResponseDTO> {
    const recipe = await this.recipesRepository.findById(id);
    
    if (!recipe) {
      throw new AppError("Recipe no exists", 500);
    }

    return recipe;
  }
}

export { GetRecipeUseCase };
