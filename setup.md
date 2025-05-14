# NestJS + Drizzle ORM + PostgreSQL Setup Guide

This guide walks you through setting up Drizzle ORM with NestJS and PostgreSQL, including schema management and migrations.

## 📦 Dependencies

Install the required packages:

```bash
npm install drizzle-orm pg  @nestjs/jwt @nestjs/config pg-connection-string dotenv
npm install -D drizzle-kit @types/pg


🛠️ Step 1: Configure Drizzle
Create a file called drizzle.config.ts in the root of your project:

// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

dotenv.config({ path: '.env' });

const config = parse(process.env.DATABASE_URL!);

export default defineConfig({
  schema: './src/**/schema.ts', // Path to your schema files
  out: './drizzle', // Path for generated migration files
  dialect: 'postgresql',
  dbCredentials: {
    host: config.host!,
    port: config.port ? parseInt(config.port) : 5432,
    user: config.user!,
    password: config.password!,
    database: config.database!,
    ssl: true, // Set to false if not using SSL
  },
);


🧱 Step 2: Define Tables (Schema)
Create your schema in a file like src/todos/schema.ts:

// src/todos/schema.ts
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const todos = pgTable('todos', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  title: text('title').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

 🧪 Step 3: Generate & Run Migrations
Run the following command to generate migrations:

npx drizzle-kit generate
npx drizzle-kit migrate
🚀 Apply SQL to your database using:
psql $DATABASE_URL -f drizzle/0000_initial_migration.sql

⚙️ Step 4: Connect Drizzle to NestJS
Create a src/database/database.module.ts file:

// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres'; // Use node-postgres variant
import * as schema from 'src/todos/schema';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
        });

        return drizzle(pool, { schema }); // node-postgres pool here
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}

Example Usage
In your src/todos/todo.service.ts file:

// src/todos/todo.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import * as schema from './schema';

@Injectable()
export class TodoService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async getTodos() {
    return this.db.query.todos.findMany();
  }

  async createTodo(title: string) {
    return this.db.insert(schema.todos).values({ title }).returning();
  }
}


✅ Example users.module.ts:
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module'; // 👈 import here

@Module({
  imports: [DatabaseModule], // 👈 make sure this is added
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}




✅ Example app.module.ts: // main
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



🔄 Drizzle ORM Migration Process
1. Generate Migrations
To generate migration files based on your schema, run:

npx drizzle-kit generate


2. Apply Migrations
Apply the generated migration to your database with:

npx drizzle-kit migrate
```
