import { UserModel } from "@models/userModel";
import { IncomingHttpHeaders } from 'http';
import { Request } from 'express';

// sign up
export type signupReqBodyDTO = Omit<UserModel, "id" | "dateCreated">;

export interface signupResBodyDTO {
     status: string;
     user: UserModel;
     token: string;
};

// login
export type loginReqBodyDTO = Pick<UserModel, "email" | "password">;

export interface loginResBodyDTO {
     status: string;
     user: Omit<UserModel, "password">;
     token: string;
};

// protect
export interface protectReqHeaderDTORequest extends Request {
  headers: IncomingHttpHeaders & {
    authorization: string;
  },
  user: UserModel,
}