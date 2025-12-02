import { UserModel } from "@models/userModel";
// interfaces

// export interface signupDto extends Omit<UserModel, "id" | "dateCreated">;

export interface signupResBodyDto {
     user: UserModel;
     status: string;
};

// types
export type signupReqBodyDto = Omit<UserModel, "id" | "dateCreated">;

