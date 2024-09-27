import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequestDTO {
  id: number;
}

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) { }
  async execute({ id } :IRequestDTO): Promise<void> {
    const category = await this.categoriesRepository.findById(id);
    
    if (!category) {
      throw new AppError("Category no exists", 500);
    }

    await this.categoriesRepository.deleteCategory(id);
  }
}

export { DeleteCategoryUseCase };
