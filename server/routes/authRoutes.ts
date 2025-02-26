import { Router } from "express";
import { signup } from "@controllers/authController";
import { signupValidator } from "@validators/authValidators";

const authRouter = Router();

authRouter.post("/sign-up", signupValidator(), signup);

// module.exports = {authRouter};
export { authRouter };
