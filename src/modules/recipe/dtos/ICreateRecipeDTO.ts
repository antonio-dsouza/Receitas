import { File } from "@modules/file/infra/prisma/entities/File";
import { Decimal } from "@prisma/client/runtime";

interface ICreateRecipeDTO {
  user_id: number;
  title: string;
  description: string;
  ingredients: string;
  portion: Decimal;
  preparation: string;
  adicional_information?: string;
  cooking_hours: Decimal;
  files?: File[];
  video: string;
  categories: number[]
}

export { ICreateRecipeDTO };
