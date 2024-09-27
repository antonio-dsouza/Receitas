import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { IUpdateCategoryDTO } from "@modules/category/dtos/IUpdateCategoryDTO";

@injectable()
class UpdateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) { }
  async execute({
    id,
    title,
    description,
  }: IUpdateCategoryDTO): Promise<void> {
    const category = await this.categoriesRepository.findById(id);
    
    if (!category) {
      throw new AppError("Category no exists", 500);
    }
    await this.categoriesRepository.updateCategory({
      id,
      title,
      description,
    });
  }
}

export { UpdateCategoryUseCase };
