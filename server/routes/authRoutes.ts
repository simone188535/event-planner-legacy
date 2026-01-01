import { Router } from "express";
import { signup, login, forgotPassword } from "@controllers/authController";
import { signupValidator, loginValidator } from "@validators/authValidators";

const authRouter = Router();

authRouter.post("/sign-up", signupValidator(), signup);
authRouter.post("/login", loginValidator(), login);

authRouter.post("/forgot-password", forgotPassword);
// authRouter.post("/reset-password", resetPassword);

export { authRouter };
