import { FOODS_SERVICE, PrismaService } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.order.findMany({
      where: {
        isDeleted: false,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.order.findUnique({
      where: {
        id,
      },
    });
  }
  async remove(id: string) {
    const order = await this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return order;
  }
}
