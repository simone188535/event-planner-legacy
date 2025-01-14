import { Router } from "express";
import { signup } from "@controllers/authController";

const authRouter = Router();

authRouter.post("/sign-up", signup);

// module.exports = {authRouter};
export { authRouter };
