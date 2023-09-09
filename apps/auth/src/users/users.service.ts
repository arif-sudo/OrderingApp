import { Injectable, UnprocessableEntityException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(request: CreateUserRequest): Promise<User> {
        await this.validateCreateUserRequest(request);
        const user = await this.userRepository.create({
            ...request,
            password: await bcrypt.hash(request.password, 10)
        });
        return user;
    }

    async getUser(args: Partial<User>): Promise<User> {
        return await this.userRepository.findOne(args)
    }

    private async validateCreateUserRequest(request: CreateUserRequest) {
        let user: User;
        try {
            user = await this.userRepository.findOne({ email: request.email })
        } catch (error) { }

        if (user) {
            throw new UnprocessableEntityException('Email alredy exists..')
        }
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ email })
        const isPassValid = await bcrypt.compare(user.password, password)

        if (!isPassValid) {
            throw new UnauthorizedException('Credentials are not valid.');
        }
        return user;
    }
}