import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    try {
      return await this.databaseService.product.create({
        data: { ...createProductDto, itemCode: randomNumber },
      });
    } catch (error) {
      console.error('🔥 Error creating product:', error); // ✅ Log full Prisma error
      throw new Error(`Failed to create product: ${error.message}`); // ✅ Return readable error
    }
  }

  async findAll() {
    return await this.databaseService.product.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.product.findUnique({ where: { id } });
  }

  async update(id: string, updateProductDto: Prisma.ProductUpdateInput) {
    return await this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.product.delete({ where: { id } });
  }
}
