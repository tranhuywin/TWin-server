import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAll() {
        return this.usersRepository.find();
    }

    async findOne(id: number) {
        return this.usersRepository.findOne(id);
    }

    async create(createUser: CreateUserDto): Promise<User> {
        const haveUser = await this.findOneByEmail(createUser.email);
        if (haveUser) {
            throw new BadRequestException('Email of user already exists');
        }
        const password = createUser.password;
        const saltOrRounds = 10;

        const hash = await bcrypt.hash(password, saltOrRounds);
        createUser.password = hash;
        createUser.registerDate = new Date().toDateString();
        createUser.email = createUser.email.toLowerCase();

        const user = new User();
        user.firstName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.email = createUser.email;
        user.password = createUser.password;
        user.registerDate = createUser.registerDate;
        user.typeRole = Role.USER; // Warning: Don't change this value

        return await this.usersRepository.save(user);
    }

    async createByEmail(email: string) {
        return await this.usersRepository.create({ email });
    }

    async findOneByEmail(email: string) {
        return this.usersRepository.findOne({ email });
    }

}
