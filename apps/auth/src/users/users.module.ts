import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name , schema: UserRepository}]),
  ],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
