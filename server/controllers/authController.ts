import { Request, Response, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import catchAsync from "@utils/catchAsync";
import { signupResBodyDto, signupReqBodyDto, loginReqBodyDto } from "dtos/auth.dtos";
import { query } from "@db/index";
import AppError from '@utils/appError';


const signup = catchAsync(
  async (req: Request<{}, {}, signupReqBodyDto, {}>, res: Response<signupResBodyDto, {}>, next: NextFunction) => {
    const { firstName, lastName, username, email, password } =
      req.body;

      // if passwords do not match
      // if (password !== passwordConfirm) {
      //   return next(new AppError(`password and confirm password need to match!`, 406));
      // }

    // encrypt password before adding to database
    const encryptedPassword = await bcrypt.hash(password, 12);

    // destructure object (to expose the rows object) and get first element of the array in the same step
    const { rows: [newUser] } = await query(
      `
    INSERT INTO users(first_name, last_name, username, email, password) 
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`,
      [firstName, lastName, username, email, encryptedPassword]
    );

    return res.status(201).json({
      status: "success",
      user: newUser,
    });
  }
);

const login = catchAsync(
  async (req: Request<{}, {}, loginReqBodyDto>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    
    // check if user exists and password is correct
  }
);

export { signup, login };
