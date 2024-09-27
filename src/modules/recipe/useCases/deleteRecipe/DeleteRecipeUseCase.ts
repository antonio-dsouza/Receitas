import { inject, injectable } from "tsyringe";

import { IRecipesRepository } from "../../repositories/IRecipesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequestDTO {
  id: number;
}

@injectable()
class DeleteRecipeUseCase {
  constructor(
    @inject("RecipesRepository")
    private recipesRepository: IRecipesRepository,
  ) { }
  async execute({ id } :IRequestDTO): Promise<void> {
    const category = await this.recipesRepository.findById(id);
    
    if (!category) {
      throw new AppError("Recipe no exists", 500);
    }

    await this.recipesRepository.deleteRecipe(id);
  }
}

export { DeleteRecipeUseCase };
