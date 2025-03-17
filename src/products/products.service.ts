import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly product = [
    {
      id: 1,
      product: 'Product 1',
      description: 'item 1',
    },
    { id: 2, product: 'Product 2', description: 'item 2' },
  ];

  findAll() {
    return this.product;
  }

  create(product) {
    this.product.push(product);
    return this.product;
  }
}
