import { inject, injectable } from "tsyringe";

import { ICreateFavoriteDTO } from "@modules/favorite/dtos/ICreateFavoriteDTO";
import { IFavoritesRepository } from "@modules/favorite/repositories/IFavoritesRepository";
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
class CreateFavoriteUseCase {
  constructor(
    @inject("FavoritesRepository")
    private recipesRepository: IFavoritesRepository,
  ) { }
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
    categories
  }: ICreateFavoriteDTO): Promise<IResponse> {
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
      categories
    });

    return recipe;
  }
}

export { CreateFavoriteUseCase };
