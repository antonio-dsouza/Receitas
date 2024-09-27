import { inject, injectable } from "tsyringe";

import { IRecipesRepository } from "../../repositories/IRecipesRepository";
import { AppError } from "@shared/errors/AppError";
import { IUpdateRecipeDTO } from "@modules/recipe/dtos/IUpdateRecipeDTO";

@injectable()
class UpdateRecipeUseCase {
  constructor(
    @inject("RecipesRepository")
    private recipesRepository: IRecipesRepository,
  ) { }
  async execute({
    id,
    user_id,
    title,
    description,
    ingredients,
    portion,
    preparation,
    adicional_information,
    cooking_hours,
    files,
  }: IUpdateRecipeDTO): Promise<void> {
    const recipe = await this.recipesRepository.findById(id);
    
    if (!recipe) {
      throw new AppError("Recipe no exists", 500);
    }
    await this.recipesRepository.updateRecipe({
      id,
      user_id,
      title,
      description,
      ingredients,
      portion,
      preparation,
      adicional_information,
      cooking_hours,
      files,
    });
  }
}

export { UpdateRecipeUseCase };
