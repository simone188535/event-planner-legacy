import { UserModel } from "@models/userModel";

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