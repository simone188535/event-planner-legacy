import { Router } from "express";
import { signup, login } from "@controllers/authController";
import { signupValidator, loginValidator } from "@validators/authValidators";

const authRouter = Router();

authRouter.post("/sign-up", signupValidator(), signup);

authRouter.get("/login", loginValidator(), login);

export { authRouter };
