import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProductDto: Prisma.ProductsCreateInput) {
    return await this.databaseService.products.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await this.databaseService.products.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.products.findUnique({ where: { id } });
  }

  async update(id: number, updateProductDto: Prisma.ProductsUpdateInput) {
    return await this.databaseService.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.products.delete({ where: { id } });
  }
}
