import { IRecipesRepository } from "../../../repositories/IRecipesRepository";
import { Recipe } from "../entities/Recipe";
import prismaClient from "@shared/infra/prisma";
import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { IUpdateRecipeDTO } from "@modules/recipe/dtos/IUpdateRecipeDTO";

class RecipesRepository implements IRecipesRepository {
  async findByCategory(category_id: number): Promise<Recipe[]> {
    const recipes = await prismaClient.recipe.findMany({
      where: {
        recipe_has_category: {
          some: {
            category_id: Number(category_id),
          },
        },
      },
      include: {
        file: true,
        recipe_has_category: {
          include: {
            category: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return recipes;
  }

  async findAllRecipes(): Promise<Recipe[]> {
    const recipes = prismaClient.recipe.findMany({
      include: {
        file: {},
        recipe_has_category: {
          include: {
            category: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return recipes;
  }

  async findById(id: number): Promise<Recipe> {
    const recipe = prismaClient.recipe.findFirst({
      where: {
        id: id,
      },
      include: {
        file: {},
        recipe_has_category: {
          include: {
            category: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return recipe;
  }

  async save({
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
  }: ICreateRecipeDTO): Promise<Recipe> {
    const recipe = await prismaClient.recipe.create({
      data: {
        user_id,
        title,
        description,
        ingredients,
        portion,
        preparation,
        adicional_information,
        cooking_hours,
        video,
        file: {
          create: files.map((file) => ({
            file_path: file.file_path,
            type: file.type,
          })),
        },
        recipe_has_category: {
          create: categories.map((category) => ({
            category_id: category,
          })),
        },
      },
      include: {
        file: true,
      },
    });
    return recipe;
  }

  async updateRecipe({
    id,
    user_id,
    title,
    description,
    ingredients,
    portion,
    preparation,
    adicional_information,
    cooking_hours,
  }: IUpdateRecipeDTO): Promise<void> {
    await prismaClient.recipe.update({
      data: {
        user_id,
        title,
        description,
        ingredients,
        portion,
        preparation,
        adicional_information,
        cooking_hours,
      },
      where: {
        id: id,
      },
    });
  }

  async deleteRecipe(id: number): Promise<void> {
    await prismaClient.$transaction([
      prismaClient.file.deleteMany({
        where: {
          recipe_id: id,
        },
      }),
      prismaClient.recipe.delete({
        where: {
          id: id,
        },
      }),
    ]);
    await prismaClient.$disconnect();
  }
}

export { RecipesRepository };
