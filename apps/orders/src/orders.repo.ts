import { AbstractRepository } from "@app/common/database/abstract.repo";
import { Logger, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Model, Connection } from 'mongoose';
import { Order } from "./schemas/order.schema";

@Injectable()
export class OrderRepository extends AbstractRepository<Order>{
    protected readonly logger = new Logger(OrderRepository.name)

    constructor(
        @InjectModel(Order.name) orderModel: Model<Order>,
        @InjectConnection() connection: Connection
    ) {
        super(orderModel, connection)
    }

    // doSomething() {
    //     this.logger.log('Doing something...');
    // }
}