import { body } from "express-validator";

export const signupValidator = () => [
    body('firstName').notEmpty(), 
    body('lastName').notEmpty(), 
    body('username').notEmpty(), 
    body('email').isEmail(), 
    body('password').isLength({min: 6}), 
    body('passwordConfirm').matches('password'), 
  ]