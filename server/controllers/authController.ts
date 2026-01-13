import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import catchAsync from "@utils/catchAsync";
import {
  signupResBodyDTO,
  signupReqBodyDTO,
  loginReqBodyDTO,
  loginResBodyDTO,
  protectReqHeaderDTORequest,
} from "@dtos/auth.dtos";
import { query } from "@db/index";
import AppError from "@utils/appError";
import { sendEmail } from "@utils/email";

const bcryptPasswordCompare = async (
  attemptedPassword: string,
  currentPassword: string
) => {
  return await bcrypt.compare(attemptedPassword, currentPassword);
};

const createToken = (id: number) =>
  jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
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
  async (
    req: Request<{}, {}, signupReqBodyDTO, {}>,
    res: Response<signupResBodyDTO, {}>,
    next: NextFunction
  ) => {
    const { firstName, lastName, username, email, password } = req.body;

    // encrypt password before adding to database
    const encryptedPassword = await bcrypt.hash(password, 12);

    // destructure object (to expose the rows object) and get first element of the array in the same step
    const {
      rows: [newUser],
    } = await query(
      `
    INSERT INTO users(first_name, last_name, username, email, password) 
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`,
      [firstName, lastName, username, email, encryptedPassword]
    );

    const token = createToken(newUser.id);

    return res.status(201).json({
      status: "success",
      user: newUser,
      token,
    });
  }
);

const login = catchAsync(
  async (
    req: Request<{}, {}, loginReqBodyDTO>,
    res: Response<loginResBodyDTO, {}>,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    // check if user exists
    const {
      rows: [existingUser],
    } = await query(`SELECT * FROM users WHERE email = ($1)`, [email]);

    // if user is not found...
    if (!existingUser) {
      return next(new AppError(`User not found!`, 404));
    }

    // check to see if password is correct
    const isPasswordCorrect = await bcryptPasswordCompare(
      password,
      existingUser.password
    );

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
      token,
    });
  }
);

const protect = catchAsync(
  async (
    req: protectReqHeaderDTORequest,
    res: Response,
    next: NextFunction
  ) => {
    // Check if token is present
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(
        new AppError(`You are not logged in! Please log in to get access!`, 406)
      );
    }

    // verification token
    const decodedToken = await verifyToken(token, process.env.JWT_SECRET!);

    // check if user still exists
    const {
      rows: [currentUser],
    } = await query(`SELECT * FROM users WHERE id = ($1)`, [decodedToken.id]);

    if (!currentUser) {
      return next(new AppError(`This user does not exist!`, 404));
    }

    // check if user changed password after the token was issued
    const { iat: iatTimestamp, exp: expTimestamp } = decodedToken;

    if (!iatTimestamp) {
      return next(new AppError(`Invalid Token! Iat does not exist!`, 406));
    }

    if (!expTimestamp) {
      return next(new AppError(`Invalid Token! exp does not exist!`, 406));
    }

    if (
      currentUser.last_modified > new Date(iatTimestamp * 1000).toISOString()
    ) {
      return next(new AppError(`Password was changed! Please login!`, 406));
    }

    // grant access to protected route
    req.user = currentUser;
    next();
  }
);

const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // get user using email
    const { email } = req.body;

    const {
      rows: [existingUser],
    } = await query(`SELECT * FROM users WHERE email = ($1)`, [email]);

    if (!existingUser) {
      return next(new AppError(`This user does not exist!`, 404));
    }

    // generate random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // send it to users email
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    const currentDate = new Date();

    const {
      rows: [updatedUser],
    } = await query(
      `
      UPDATE users
      SET password_reset_token = ($1), password_reset_expires = ($2), last_modified = ($3)
      WHERE email = ($4)
      RETURNING *
    `,
      [hashedToken, passwordResetExpires, currentDate, email]
    );

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/reset-password/${hashedToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}. \nIf you didn't forget your password, please ignore this email!`;

    try {
    await sendEmail({
      to: updatedUser.email, 
      subject: 'Your password reset token (valid for 10 minutes)',
      text: message
    })

    return res.status(200).json({
      status: "success",
      message: "Token sent to email!"
    });
    } catch (err) {
      return next(new AppError(`Forgot password email could not be sent. Please Try Again!`, 500));
    };
  }
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // get user based on token
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    // if token has not expired, and there is user, set new password
    // update last_modified property
    // login the user in, send JWT
  }
);

export { signup, login, protect, forgotPassword, resetPassword };
