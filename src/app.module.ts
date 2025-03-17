import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [ProductsModule, DatabaseModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
