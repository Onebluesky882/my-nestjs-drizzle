import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DATABASE_CONNECTION } from './database-connection';
import { schema } from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [ConfigModule],
  controllers: [DatabaseController],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
        });
        return drizzle(pool, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
