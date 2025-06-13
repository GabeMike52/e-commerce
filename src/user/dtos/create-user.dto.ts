import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "The username must not be empty!" })
    @IsString({ message: "The username must be a string!" })
    @MinLength(3, { message: "The username must have at least 3 characters!" })
    @MaxLength(12, { message: "The username's length is greater than 12 characters!" })
    username: string;

    @IsNotEmpty({ message: "The email must not be empty!" })
    @IsEmail({}, { message: "The email must be valid!" })
    email: string;

    @IsNotEmpty({ message: "The password must not be empty!" })
    @MinLength(6, { message: "The password must have at least 6 character!" })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, { message: "The password must contain lowercase characters, uppercase characters, numbers and symbols" })
    password: string;
}