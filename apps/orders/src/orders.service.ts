import { FOODS_SERVICE, OrderEntity } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepositary: Repository<OrderEntity>,
  ) {}
  create(createHahaDto: any) {}

  findAll() {
    return this.orderRepositary.find({
      where: {
        isDeleted: false,
      },
    });
  }

  findOne(id: string) {
    return this.orderRepositary.findOne({
      where: {
        id,
      },
    });
  }
  async remove(id: string) {
    const order = await this.orderRepositary.findOne({
      where: {
        id,
      },
    });

    order.isDeleted = true;
    return this.orderRepositary.save(order);
  }
}
