import { File } from "@modules/file/infra/prisma/entities/File";

interface ICreateCategoryDTO {
  title: string;
  description: string;
  image?: File;
}

export { ICreateCategoryDTO };
