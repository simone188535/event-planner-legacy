import catchAsync from "@utils/catchAsync";
import { Request, Response, NextFunction } from "express";

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    return res.json({
        status: 'success',
        user: 'mike'
    })
  }
);


export { signup };