import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "@modules/category/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "@modules/category/repositories/ICategoriesRepository";

interface IResponse {
  title: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) { }
  async execute({
    title,
    description,
    image
  }: ICreateCategoryDTO): Promise<IResponse> {
    if (image) {
      const category = await this.categoriesRepository.saveWithImage({
        title,
        description,
        image,
      });

      return category;
    }

    const category = await this.categoriesRepository.save({
      title,
      description
    });

    return category;
  }
}

export { CreateCategoryUseCase };
