import { Router } from "express";

import { AuthenticateUserController } from "@modules/auth/useCases/authenticateUser/AuthenticateUserController";
import { RegisterUserController } from "@modules/auth/useCases/registerUser/RegisterUserController";
import { ResetPasswordUserController } from "@modules/auth/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/auth/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const registerUserController = new RegisterUserController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordUserController();

authenticateRoutes.post("/register", registerUserController.handle);
authenticateRoutes.post("/login", authenticateUserController.handle);

authenticateRoutes.post("/forgot", sendForgotPasswordMailController.handle);
authenticateRoutes.post("/reset", resetPasswordController.handle);

export { authenticateRoutes };
