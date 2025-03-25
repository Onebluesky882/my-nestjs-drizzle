import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [DatabaseModule, ProductsModule, UsersModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
