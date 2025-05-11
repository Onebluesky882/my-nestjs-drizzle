import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { schema } from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE_CONNECTION', // Use a provider key to inject the connection
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'), // Use the right config variable
        });

        const connectionString = pool.options.connectionString;
        if (!connectionString) {
          throw new Error('DATABASE_URL is not defined in the configuration');
        }

        return drizzle(connectionString, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DATABASE_CONNECTION'], // Export the database connection
})
export class DatabaseModule {}
