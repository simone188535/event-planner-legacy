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
    const errors = validationResult(req);
    console.log('helo validations', errors.isEmpty());
    // if there are any errors...
    if (!errors.isEmpty()) {
        console.log(errors.array());
        // next(new AppError('f', 406));
        // next(res.send(errors.array()));
    //   next(new AppError(JSON.stringify(errors.array()), 406));
    // res.status(406).json({
    //     status: 'error',
    //     token,
    //     data: {
    //       user
    //     }
    //   });

    res.status(406).json({err: errors.array()});
    }

    return next();
  };



export { checkValidators };
