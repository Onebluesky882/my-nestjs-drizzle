import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductsCreateInput) {
    try {
      console.log('🚀 Data before insert:', createProductDto); // Debug request data

      return await this.databaseService.products.create({
        data: createProductDto,
      });
      console.log('✅ Created product:'); // Debug successful insert
    } catch (error) {
      console.error('🔥 Prisma Error:', error); // Debug Prisma errors
      throw new InternalServerErrorException(
        error.message || 'Failed to create product',
      );
    }
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
    return await this.databaseService.products.delete({
      where: { id },
    });
  }
}
