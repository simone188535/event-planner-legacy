import catchAsync from "@utils/catchAsync";
import { signupDto } from "dtos/auth.dtos";
import { query } from "@db/index";
import { Request, Response, NextFunction } from "express";
import AppError from '@utils/appError';

const signup = catchAsync(
  async (req: Request<{}, {}, signupDto, {}>, res: Response, next: NextFunction) => {
    const { firstName, lastName, username, email, password, passwordConfirm } =
      req.body;

      // if passwords do not match
      if (password !== passwordConfirm) {
        return new AppError(`password and confirm password need to match!`, 406);
      }

    // destructure object (to expose the rows object) and get first element of the array in the same step
    const { rows: [newUser] } = await query(
      `
    INSERT INTO users(first_name, last_name, username, email, password, password_confirm) 
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`,
      [firstName, lastName, username, email, password, passwordConfirm]
    );

    return res.status(201).json({
      status: "success",
      user: newUser,
    });
  }
);

export { signup };
