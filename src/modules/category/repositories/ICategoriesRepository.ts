import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "../dtos/IUpdateCategoryDTO";
import { Category } from "../infra/prisma/entities/Category";

interface ICategoriesRepository {
  findById(id: number): Promise<Category>;
  findAllCategories(): Promise<Category[]>;
  saveWithImage({ title, description, image }: ICreateCategoryDTO): Promise<Category>;
  save({ title, description }: ICreateCategoryDTO): Promise<Category>;
  updateCategory({ id, title, description, image }: IUpdateCategoryDTO): Promise<void>;
  deleteCategory(id: number): Promise<void>;
}

export { ICategoriesRepository };
