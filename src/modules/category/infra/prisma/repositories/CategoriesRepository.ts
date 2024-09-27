import {
  ICategoriesRepository,
} from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";
import prismaClient from "@shared/infra/prisma";
import { ICreateCategoryDTO } from "@modules/category/dtos/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "@modules/category/dtos/IUpdateCategoryDTO";

class CategoriesRepository implements ICategoriesRepository {
  async findAllCategories(): Promise<Category[]> {
    const categories = prismaClient.category.findMany({
      include: {
        file: {
          take: 1,
        },
      },
    });

    return categories;
  }

  async findById(id: number): Promise<Category> {
    const category = prismaClient.category.findFirst({
      where: {
        id: id,
      },
      include: {
        file: {
          take: 1,
        }
      },
    });
    return category;
  }

  async save({
    title,
    description
  }: ICreateCategoryDTO): Promise<Category> {
    const category = await prismaClient.category.create({
      data: {
        title,
        description,
      },
    });
    return category;
  }

  async saveWithImage({
    title,
    description,
    image
  }: ICreateCategoryDTO): Promise<Category> {
    const category = await prismaClient.category.create({
      data: {
        title,
        description,
        file: {
          create: image
        }
      },
    });
    return category;
  }

  async updateCategory({ id, title, description }: IUpdateCategoryDTO): Promise<void> {
    await prismaClient.category.update({
      data: {
        title,
        description
      },
      where: {
        id: id,
      },
    });
  }

  async deleteCategory(id: number): Promise<void> {
    await prismaClient.$transaction([
      prismaClient.file.deleteMany({
        where: {
          category_id: id,
        },
      }),
      prismaClient.category.delete({
        where: {
          id: id,
        },
      }),
    ]);
    await prismaClient.$disconnect();
  }
}

export { CategoriesRepository };
