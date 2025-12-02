import { Router } from "express";
import { signup } from "@controllers/authController";
import { signupValidator } from "@validators/authValidators";
// import { checkValidators } from "@middlewares/validators";

const authRouter = Router();

authRouter.post("/sign-up", 
    signupValidator(),
    //  checkValidators, 
     signup);


// module.exports = {authRouter};
export { authRouter };
