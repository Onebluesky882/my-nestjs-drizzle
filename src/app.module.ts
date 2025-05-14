import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ListsService } from './lists/lists.service';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [DatabaseModule, ListsModule],
  controllers: [],
  providers: [ListsService],
})
export class AppModule {}
