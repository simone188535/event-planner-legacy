import { UserModel } from "@models/userModel";

// sign up
// interfaces
// export interface signupDto extends Omit<UserModel, "id" | "dateCreated">;

export interface signupResBodyDto {
     user: UserModel;
     status: string;
};

// types
export type signupReqBodyDto = Omit<UserModel, "id" | "dateCreated">;

// login
export type loginReqBodyDto = Pick<UserModel, "email" | "password">;