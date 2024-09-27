import { Router } from "express";
// import multer from "multer";

// import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UpdateUserController } from "@modules/auth/useCases/updateUser/UpdateUserController";

const usersRoutes = Router();

// const uploadAvatar = multer(uploadConfig);
const updateUserController = new UpdateUserController();

usersRoutes.patch("/:id", ensureAuthenticated, updateUserController.handle);

export { usersRoutes };
