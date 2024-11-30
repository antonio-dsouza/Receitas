import { inject, injectable } from "tsyringe";

import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { IRecipesRepository } from "@modules/recipe/repositories/IRecipesRepository";
import { Decimal } from "@prisma/client/runtime";

interface IResponse {
  title: string;
  description: string;
  ingredients: string;
  portion: Decimal;
  preparation: string;
  adicional_information?: string;
  cooking_hours: Decimal;
}

@injectable()
class CreateRecipeUseCase {
  constructor(
    @inject("RecipesRepository")
    private recipesRepository: IRecipesRepository
  ) {}
  async execute({
    user_id,
    title,
    description,
    ingredients,
    portion,
    preparation,
    adicional_information,
    cooking_hours,
    files,
    video,
    categories,
  }: ICreateRecipeDTO): Promise<IResponse> {
    const recipe = await this.recipesRepository.save({
      user_id,
      title,
      description,
      ingredients,
      portion,
      preparation,
      adicional_information,
      cooking_hours,
      files,
      video,
      categories,
    });

    return recipe;
  }
}

export { CreateRecipeUseCase };
