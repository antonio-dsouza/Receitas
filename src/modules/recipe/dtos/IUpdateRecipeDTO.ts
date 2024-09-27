import { File } from "@modules/file/infra/prisma/entities/File";
import { Decimal } from "@prisma/client/runtime";

interface IUpdateRecipeDTO {
  id: number;
  user_id: number;
  title?: string;
  description?: string;
  ingredients?: string;
  portion?: Decimal;
  preparation?: string;
  adicional_information?: string;
  cooking_hours?: Decimal;
  files?: File[];
}

export { IUpdateRecipeDTO };
