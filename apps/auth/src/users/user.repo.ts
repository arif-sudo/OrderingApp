import { AbstractRepository } from "@app/common/database/abstract.repo";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Injectable, Logger } from '@nestjs/common'
import { User } from "./schemas/user.schema";
import { Model, Connection } from "mongoose";

@Injectable()
export class UserRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UserRepository.name)
    
    constructor(
        @InjectModel(User.name) userModel: Model<User>,
        @InjectConnection() connection: Connection
    ) {
        super(userModel, connection)
    }

}