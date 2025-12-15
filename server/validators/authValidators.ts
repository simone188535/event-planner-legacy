import { body } from "express-validator";
import { checkValidators } from "@middlewares/validators";
import { ValidatorWithCheck } from "@validators/types";


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
  checkValidators
];

const loginValidator = (): ValidatorWithCheck => [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email is invalid!"),
  body("password")
    .notEmpty()
    .withMessage("password is required!"),
  checkValidators
];

export { signupValidator, loginValidator };
