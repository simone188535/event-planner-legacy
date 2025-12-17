import { UserModel } from "@models/userModel";
import { IncomingHttpHeaders } from 'http';
import { Request } from 'express';

// sign up
export type signupReqBodyDto = Omit<UserModel, "id" | "dateCreated">;

export interface signupResBodyDto {
     status: string;
     user: UserModel;
     token: string;
};

// login
export type loginReqBodyDto = Pick<UserModel, "email" | "password">;

export interface loginResBodyDto {
     status: string;
     user: Omit<UserModel, "password">;
     token: string;
};

// protect
export interface protectReqHeaderDTORequest extends Request {
  headers: IncomingHttpHeaders & {
    authorization: string;
  }
}