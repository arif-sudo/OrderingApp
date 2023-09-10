import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrderRepository } from './orders.repo';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
//Client proxy is a communication layer that allows one microservice to interact with another microservice
// using a lightweight and efficient RPC (Remote Procedure Call) mechanism. 
//It abstracts the complexity of network communication and enables seamless inter-microservice communication within a distributed application.

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private bilingClient: ClientProxy) { }
  //bilingclient will return an observable

  async create(request: CreateOrderRequest, authentication: string) {
    //A database transaction is a single unit of work that consists of one or more SQL operations, 
    //ensuring that all operations are either completed successfully or none of them are applied to the database, maintaining data integrity.

    const Session = await this.orderRepository.startTransaction()
    try {
      const order = await this.orderRepository.create(request, { session: Session })
      await lastValueFrom(
        this.bilingClient.emit('order_created', {
          request,
          Authentication: authentication
          // The emit method sends a message to the billing service without expecting a direct response,
          // making it suitable for broadcasting events or notifications.
        })
      )
      await Session.commitTransaction();
      return order;
    } catch (error) {
      // abort current active transaction 
      // cancel any database call
      await Session.abortTransaction();
      throw error;
    }
  }

  async getAll() {
    const orders = await this.orderRepository.find({})
    return orders;
  }
}
