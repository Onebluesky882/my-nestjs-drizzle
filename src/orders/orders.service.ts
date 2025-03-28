import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createOrderDto: Prisma.OrdersCreateInput) {
    return await this.databaseService.orders.create({ data: createOrderDto });
  }

  async findAll() {
    return await this.databaseService.orders.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.orders.findUnique({ where: { id } });
  }

  async update(id: number, updateOrderDto: Prisma.OrdersUpdateInput) {
    return await this.databaseService.orders.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.orders.delete({ where: { id } });
  }
}
