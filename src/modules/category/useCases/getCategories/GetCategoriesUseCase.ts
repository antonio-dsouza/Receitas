import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { ICategoryResponseDTO } from "@modules/category/dtos/ICategoryResponseDTO";

@injectable()
class GetCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) { }
  async execute(): Promise<ICategoryResponseDTO[]> {
    const categories = await this.categoriesRepository.findAllCategories();

    return categories;
  }
}

export { GetCategoriesUseCase };
