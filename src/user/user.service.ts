import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcryptjs from "bcryptjs";
import logger from 'src/config/logger.config';
import { SigninUserDto } from './dtos/signin-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    
    public async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const existingUser = await this.userRepository.findBy({ email: createUserDto.email });
        console.log(existingUser);
        if (existingUser.length) {
            throw new ConflictException("The typed email is already in use!");
        }

        const hashPassword = await bcryptjs.hash(createUserDto.password, 10);

        const user = this.userRepository.create({
            username: createUserDto.username,
            email: createUserDto.email,
            password: hashPassword,
        });

        const savedUser = await this.userRepository.save(user);
        
        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }

    public async signin(signinUserDto: SigninUserDto): Promise<Omit<User, 'password'> | null> {
        const userFound = await this.userRepository.findOneBy({ email: signinUserDto.email })

        if (!userFound) {
            throw new NotFoundException("No user was found!");
        }

        const isMatch = bcryptjs.compareSync(signinUserDto.password, userFound.password);

        if (isMatch) {
            return userFound;
        } else {
            throw new UnauthorizedException("Password is not correct");
        }
    }
}
