import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createOrderDto: Prisma.OrderCreateInput) {
    return await this.databaseService.order.create({
      data: { ...createOrderDto },
    });
  }

  async findAll() {
    return await this.databaseService.order.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.order.findUnique({ where: { id } });
  }

  async update(id: string, updateOrderDto: Prisma.OrderUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: { ...updateOrderDto },
    });
  }

  async remove(id: string) {
    return this.databaseService.order.delete({ where: { id } });
  }
}
