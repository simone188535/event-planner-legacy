import { Router } from "express";
import { forgotPassword, resetPassword } from "@controllers/authController";
// import { signupValidator, loginValidator } from "@validators/authValidators";
import { protectValidator } from "@validators/authValidators";
import {protect } from "@controllers/authController";

const userRouter = Router();


userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

// userRouter.use(protectValidator(), protect);


export { userRouter };
