// interfaces

export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    dateCreated: Date;
}


export interface createUserDto {
    
}
