import { IsString, IsNotEmpty } from "class-validator";

export class SigninUserDto {
    @IsNotEmpty({ message: "The email is needed" })
    @IsString({ message: "The email must be a string!" })
    email: string;

    @IsNotEmpty({ message: "The passowrd is needed" })
    password: string;
}