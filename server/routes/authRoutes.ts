import { Router } from "express";
import { signup, login } from "@controllers/authController";
import { signupValidator } from "@validators/authValidators";
import { checkValidators } from "@middlewares/validators";

const authRouter = Router();

authRouter.post("/sign-up", 
    signupValidator(),
     checkValidators, 
     signup);

authRouter.get("/login", signupValidator(), login);

// module.exports = {authRouter};
export { authRouter };
