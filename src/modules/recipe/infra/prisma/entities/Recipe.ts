import { Decimal } from "@prisma/client/runtime";

class Recipe {
  public readonly id: number;
  title: string;
  description: string;
  ingredients: string;
  portion: Decimal;
  preparation: string;
  adicional_information?: string;
  cooking_hours: Decimal;
  images?: File[];
  video?: string;
}

export { Recipe };
