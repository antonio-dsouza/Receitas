import { inject, injectable } from "tsyringe";

import { IRecipesRepository } from "../../repositories/IRecipesRepository";
import { IRecipeResponseDTO } from "@modules/recipe/dtos/IRecipeResponseDTO";

@injectable()
class GetRecipesUseCase {
  constructor(
    @inject("RecipesRepository")
    private recipesRepository: IRecipesRepository,
  ) { }
  async execute({ category_id }): Promise<IRecipeResponseDTO[]> {
    if (category_id) {
      return await this.recipesRepository.findByCategory(category_id)
    }
    
    return await this.recipesRepository.findAllRecipes();
  }
}

export { GetRecipesUseCase };
