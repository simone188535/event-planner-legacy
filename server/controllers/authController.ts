import { promisify } from "util";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import catchAsync from "@utils/catchAsync";
import { signupResBodyDTO, signupReqBodyDTO, loginReqBodyDTO, loginResBodyDTO, protectReqHeaderDTORequest } from "dtos/auth.dtos";
import { query } from "@db/index";
import AppError from '@utils/appError';

const bcryptPasswordCompare = async (attemptedPassword: string, currentPassword: string) => {
  return await bcrypt.compare(attemptedPassword, currentPassword);
}

const createToken = (id: number) => jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '7d'
});

const verifyToken = (token: string, secret: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded) {
        return reject(err);
      }
      resolve(decoded as JwtPayload);
    });
  });
};

const signup = catchAsync(
  async (req: Request<{}, {}, signupReqBodyDTO, {}>, res: Response<signupResBodyDTO, {}>, next: NextFunction) => {
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

    // generate the jwt token that allows to access protected routes
    // const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
    //   expiresIn: '7d'
    // });
    const token = createToken(newUser.id);

    return res.status(201).json({
      status: "success",
      user: newUser,
      token
    });
  }
);

const login = catchAsync(
  async (req: Request<{}, {}, loginReqBodyDTO>, res: Response<loginResBodyDTO, {}>, next: NextFunction) => {
    const { email, password } = req.body;
    
    // check if user exists 
    const { rows: [existingUser] } = await query(
      `SELECT * FROM users WHERE email = ($1)`,
      [email]
    );

    // if user is not found...
    if (!existingUser) {
      return next(new AppError(`User not found!`, 404));
    }

    // check to see if password is correct
    const isPasswordCorrect = await bcryptPasswordCompare(password, existingUser.password);

    // if password is incorrect...
    if (!isPasswordCorrect) {
      return next(new AppError(`Password incorrect!`, 406));
    }

    // if a user is found and password is valid, create a token
     const token = createToken(existingUser.id);


    // remove password from existingUser for security
    existingUser.password = undefined;

     return res.status(200).json({
      status: "success",
      user: existingUser,
      token
    });
  }
);

const protect = catchAsync(
  async (req: protectReqHeaderDTORequest, res: Response, next: NextFunction) => {
    // Check if token is present
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(new AppError(`You are not logged in! Please log in to get access!`, 406));
    }

    // verification token
      const decodedToken = await verifyToken(token, process.env.JWT_SECRET!);
      console.log(decodedToken);

    // check if user still exists
    const { rows: [existingUser] } = await query(
      `SELECT * FROM users WHERE id = ($1)`,
      [decodedToken.id]
    );
    console.log("existingUser", existingUser);

    if (!existingUser) {
       return next(new AppError(`This user does not exist!`, 400));
    }


    // check if user changed password after the token was issued

    next();
  });

export { signup, login, protect };
