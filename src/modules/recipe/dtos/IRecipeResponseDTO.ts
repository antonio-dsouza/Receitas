import { Decimal } from "@prisma/client/runtime";

interface IRecipeResponseDTO {
  title: string;
  description: string;
  ingredients: string;
  portion: Decimal;
  preparation: string;
  adicional_information?: string;
  cooking_hours: Decimal;
  files?: File[];
}

export { IRecipeResponseDTO }