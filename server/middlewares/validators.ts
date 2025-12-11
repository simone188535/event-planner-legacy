import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import AppError from "@utils/appError";

const checkValidators =
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    const errors = results.array();

    // if there is one error, pass a single object to the AppError
    if (errors.length === 1) {
       next(new AppError(errors[0].msg, 406));
    } // if there is more than one error message
    else if (errors.length > 1) {
       // if there are multiple, pass multiple errors the AppError array
       next(new AppError("Multiple validation errors occurred.", 406, errors));
    }

    return next();
  };



export { checkValidators };
