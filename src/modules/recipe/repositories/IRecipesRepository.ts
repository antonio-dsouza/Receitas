import { ICreateRecipeDTO } from "../dtos/ICreateRecipeDTO";
import { IUpdateRecipeDTO } from "../dtos/IUpdateRecipeDTO";
import { Recipe } from "../infra/prisma/entities/Recipe";

interface IRecipesRepository {
  findById(id: number): Promise<Recipe>;
  findAllRecipes(): Promise<Recipe[]>;
  findByCategory(category_id: number): Promise<Recipe[]>;
  save({ user_id, title, description, ingredients, portion, preparation, adicional_information, cooking_hours, files, categories, video }: ICreateRecipeDTO): Promise<Recipe>;
  updateRecipe({ title, description, ingredients, portion, preparation, adicional_information, cooking_hours, files }: IUpdateRecipeDTO): Promise<void>;
  deleteRecipe(id: number): Promise<void>;
}

export { IRecipesRepository };
