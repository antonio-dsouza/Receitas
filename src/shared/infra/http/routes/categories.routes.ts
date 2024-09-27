import multer from "multer";
import uploadConfig from "@config/upload";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCategoryController } from "@modules/category/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "@modules/category/useCases/deleteCategory/DeleteCategoryController";
import { havePermission } from "../middlewares/havePermission";
import { GetCategoryController } from "@modules/category/useCases/getCategory/GetCategoryController";
import { GetCategoriesController } from "@modules/category/useCases/getCategories/GetCategoriesController";
import { UpdateCategoryController } from "@modules/category/useCases/updateCategory/UpdateCategoryController";

const upload = multer(uploadConfig);
const categoriesRoutes = Router();

const getCategoryController = new GetCategoryController();
const getCategoriesController = new GetCategoriesController();
const createCategoryController = new CreateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const updateCategoryController = new UpdateCategoryController();
// , havePermission("category.get")
// havePermission("category.create"),,
// havePermission("category.update"),
categoriesRoutes.get("/:id", upload.none(), getCategoryController.handle);
categoriesRoutes.get("/", getCategoriesController.handle);
categoriesRoutes.post("/", ensureAuthenticated, upload.single("image"), createCategoryController.handle);
categoriesRoutes.patch("/:id", ensureAuthenticated, upload.single("image"), updateCategoryController.handle);
categoriesRoutes.delete("/:id", ensureAuthenticated, havePermission("category.delete"), deleteCategoryController.handle);

export { categoriesRoutes };
