import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "The username must not be empty!" })
    @IsString({ message: "The username must be a string!" })
    @MinLength(3, { message: "The username must have a 3 characters min size!" })
    @MaxLength(12, { message: "The username must have a 12 characters max size!" })
    username: string;

    @IsNotEmpty({ message: "The email must not be empty!" })
    @IsEmail({}, { message: "The email must be valid!" })
    email: string;

    @IsNotEmpty({ message: "The password must not be empty!" })
    @MinLength(6, { message: "The password must have a 6 characters min size!" })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, { message: "The password must contain lowercase characters, uppercase characters, numbers and symbols" })
    password: string;
}