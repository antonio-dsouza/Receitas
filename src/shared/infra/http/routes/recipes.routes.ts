import multer from "multer";
import uploadConfig from "@config/upload";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateRecipeController } from "@modules/recipe/useCases/createRecipe/CreateRecipeController";
import { DeleteRecipeController } from "@modules/recipe/useCases/deleteRecipe/DeleteRecipeController";
import { havePermission } from "../middlewares/havePermission";
import { GetRecipeController } from "@modules/recipe/useCases/getRecipe/GetRecipeController";
import { GetRecipesController } from "@modules/recipe/useCases/getRecipes/GetRecipesController";
import { UpdateRecipeController } from "@modules/recipe/useCases/updateRecipe/UpdateRecipeController";

const upload = multer(uploadConfig);
const recipesRoutes = Router();

const getRecipeController = new GetRecipeController();
const getRecipesController = new GetRecipesController();
const createRecipeController = new CreateRecipeController();
const deleteRecipeController = new DeleteRecipeController();
const updateRecipeController = new UpdateRecipeController();
// , havePermission("recipe.get")
// havePermission("recipe.create"),,
// havePermission("recipe.update"),
recipesRoutes.get("/:id", getRecipeController.handle);
recipesRoutes.get("/", getRecipesController.handle);
recipesRoutes.post("/", ensureAuthenticated, upload.array('files'), createRecipeController.handle);
recipesRoutes.patch("/:id", ensureAuthenticated, upload.array('files'), updateRecipeController.handle);
recipesRoutes.delete("/:id", ensureAuthenticated, havePermission("recipe.delete"), deleteRecipeController.handle);

export { recipesRoutes };
