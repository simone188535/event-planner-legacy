import { Router } from "express";
import { signup, login } from "@controllers/authController";
import { signupValidator, loginValidator } from "@validators/authValidators";
import { checkValidators } from "@middlewares/validators";

const authRouter = Router();

authRouter.post("/sign-up", signupValidator(), checkValidators, signup);

authRouter.get("/login", loginValidator(), checkValidators, login);

export { authRouter };
