import { Request, Response, NextFunction } from "express";
import { body, header } from "express-validator";
import { checkValidators } from "@middlewares/validators";
import { ValidatorWithCheck } from "@validators/types";
import AppError from "@utils/appError";

const signupValidator = (): ValidatorWithCheck => [
  body("firstName").notEmpty().withMessage("First name is required!"),
  body("lastName").notEmpty().withMessage("Last name is required!"),
  body("username").notEmpty().withMessage("Username is required!"),
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email is invalid!"),
  body("password")
    .notEmpty()
    .withMessage("password is required!")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters!"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("Confirm password is required!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  checkValidators,
];

const loginValidator = (): ValidatorWithCheck => [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email is invalid!"),
  body("password").notEmpty().withMessage("password is required!"),
  checkValidators,
];

const protectValidator = (req: Request, res: Response, next: NextFunction): ValidatorWithCheck => [
  header("authorization")
    .exists({values: 'falsy'})
    .withMessage("Authorization Header required!")
    .bail() // not necessary, but it stops execution if previous validation failed
    .contains("Bearer")
    .withMessage("Authorization Token is not Bearer"),
    // .bail()
    // .custom((value, { req }) => {
    //   // You can add more complex checks here, like JWT verification
    //   const token = value.split(' ')[1];
    //   if (!token) {
    //     return next(new AppError(`You are not logged in! Please log in to get access.`, 406));
    //   }
    //   return true;
    // }),
    checkValidators,
];

export { signupValidator, loginValidator, protectValidator };
