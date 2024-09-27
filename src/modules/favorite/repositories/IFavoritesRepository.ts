import { ICreateFavoriteDTO } from "../dtos/ICreateFavoriteDTO";
import { Favorite } from "../infra/prisma/entities/Favorite";

interface IFavoritesRepository {
  findAllUserFavorites(): Promise<Favorite[]>;
  save({ user_id, recipe_id }: ICreateFavoriteDTO): Promise<Favorite>;
  delete(user_id: number, recipe_id: number): Promise<void>;
}

export { IFavoritesRepository };
