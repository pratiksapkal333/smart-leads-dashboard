export enum UserRole {
    ADMIN = "Admin",
    SALES = "Sales User",
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}