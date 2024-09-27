import {
  IFavoritesRepository,
} from "../../../repositories/IFavoritesRepository";
import { Favorite } from "../entities/Favorite";
import prismaClient from "@shared/infra/prisma";
import { ICreateFavoriteDTO } from "@modules/favorite/dtos/ICreateFavoriteDTO";

class FavoritesRepository implements IFavoritesRepository {
  async findAllUserFavorites(): Promise<Favorite[]> {
    const categories = prismaClient.favorite.findMany();

    return categories;
  }

  async save({
    user_id,
    recipe_id
  }: ICreateFavoriteDTO): Promise<Favorite> {
    const favorite = await prismaClient.favorite.create({
      data: {
        user_id,
        recipe_id,
      },
    });
    return favorite;
  }

  async delete(user_id: number, recipe_id: number): Promise<void> {
    await prismaClient.favorite.deleteMany({
      where: {
        user_id,
        AND: {
          recipe_id
        }
      }
    })
  }
}

export { FavoritesRepository };
