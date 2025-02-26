import { UserModel } from "@models/userModel";
// interfaces

// export interface signupDto extends Omit<UserModel, "id" | "dateCreated">;

// types
export type signupDto = Omit<UserModel, "id" | "dateCreated">;
