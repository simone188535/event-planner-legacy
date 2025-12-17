import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
import catchAsync from "@utils/catchAsync";
// import { signupResBodyDto, signupReqBodyDto, loginReqBodyDto, loginResBodyDto } from "dtos/auth.dtos";
// import { query } from "@db/index";
// import AppError from '@utils/appError';


const addEvent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
    return res.status(201).json({
      status: "success",

    });
  }
);

export { addEvent };
