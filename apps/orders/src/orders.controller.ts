import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async createOrder(@Body() request: CreateOrderRequest) {
    return this.ordersService.create(request)
  }

  @Get()
  async getAllOrdes(){
    return this.ordersService.getAll()
  }
}
