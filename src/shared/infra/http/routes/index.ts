import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { categoriesRoutes } from "./categories.routes";
import { recipesRoutes } from "./recipes.routes";

const router = Router();

router.use("/", authenticateRoutes);
router.use("/category", categoriesRoutes);
router.use("/recipe", recipesRoutes);
router.use("/users", usersRoutes);

export { router };
