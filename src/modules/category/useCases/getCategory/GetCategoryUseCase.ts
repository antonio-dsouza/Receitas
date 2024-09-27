import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { ICategoryResponseDTO } from "@modules/category/dtos/ICategoryResponseDTO";

interface IRequestDTO {
  id: number;
}

@injectable()
class GetCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) { }
  async execute({ id }: IRequestDTO): Promise<ICategoryResponseDTO> {
    const category = await this.categoriesRepository.findById(id);
    
    if (!category) {
      throw new AppError("Category no exists", 500);
    }

    return category;
  }
}

export { GetCategoryUseCase };
