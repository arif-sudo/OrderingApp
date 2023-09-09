import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user.request';

@Controller('auth/users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post()
    async createUser(@Body() request: CreateUserRequest) {
        this.userService.createUser(request)
    }

}
