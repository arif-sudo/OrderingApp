import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserRequest {
    @IsString()
    readonly username: string;

    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsStrongPassword()
    readonly password: string
}