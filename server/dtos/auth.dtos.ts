import { UserModel } from "@models/userModel";
// interfaces

// export interface signupDto extends Omit<UserModel, "id" | "dateCreated">;

// types
export type signupReqBodyDto = Omit<UserModel, "id" | "dateCreated">;
export type signupResBodyDto = UserModel;
