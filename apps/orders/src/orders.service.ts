import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrderRepository } from './orders.repo';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) { }

  async create(request: CreateOrderRequest) {
    const order = await this.orderRepository.create(request);
    return order;
  }

  async getAll(){
    const orders = await this.orderRepository.find({})
    return orders;
  }
}
