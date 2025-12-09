import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import AppError from "@utils/appError";

const checkValidators =
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);
    const errors = results.array();

    // const formattedResults = results.formatWith(error => error.msg as string);
    console.log('helo validations', errors);
    // if there are any errors...
    // if (!errors.isEmpty()) {
    //     console.log(errors.array());

    // res.status(406).json({err: errors.array()});
    // }

    // if there is one error, pass a single object to the AppError
    if (errors.length === 1) {
       next(new AppError(errors[0].msg, 404));
    } // if there is more than one error message
    else if (errors.length > 1) {
       // if there are multiple, pass multiple errors the AppError array
       next(new AppError("Multiple validation errors occurred.", 404, errors));
    }

    return next();
  };



export { checkValidators };
