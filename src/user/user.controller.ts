import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninUserDto } from './dtos/signin-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    create(@Body() createUserDto: CreateUserDto)  {
        return this.userService.create(createUserDto);
    }

    @Post('sigin')
    signin(@Body() signinUserDto: SigninUserDto) {
        return this.userService.signin(signinUserDto);
    }
}
