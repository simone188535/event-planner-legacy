import { Router } from "express";
import { forgotPassword } from "@controllers/authController";
// import { signupValidator, loginValidator } from "@validators/authValidators";
import { protectValidator } from "@validators/authValidators";
import {protect } from "@controllers/authController";

const userRouter = Router();


userRouter.post("/forgot-password", forgotPassword);

userRouter.use(protectValidator(), protect);

// userRouter.post("/reset-password", resetPassword);

export { userRouter };
