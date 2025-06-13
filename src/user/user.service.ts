import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcryptjs from "bcryptjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    
    public async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const existingUser = await this.userRepository.findBy({ username: createUserDto.username });

        if (existingUser) {
            throw new ConflictException("The typed username is already in use!");
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
}
