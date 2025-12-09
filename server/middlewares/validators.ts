import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import AppError from "@utils/appError";

// const checkValidators =
//   (validators: ValidationChain[], onlyFirstError = false) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     console.log('helo validations', errors.isEmpty());
//     // if there are any errors...
//     if (!errors.isEmpty()) {
//       next(new AppError(errors.array({ onlyFirstError: onlyFirstError }), 406));
//     }

//     return next();
//   };
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
       next(new AppError("Multiple validation errors occurred.", 404, errors));
    }

    // if there are multiple, pass multiple errors the AppError cause

    return next();
  };



export { checkValidators };
