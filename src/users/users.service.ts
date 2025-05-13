import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from 'src/database/schema';
import { users } from './schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async createUser(name: string) {
    return this.database
      .insert(schema.users)
      .values({
        name: name,
      })
      .returning();
  }

  async getAllUsers() {
    return this.database.query.users.findMany();
  }

  async findOne(name: string) {
    return this.database.query.users.findFirst({
      where: eq(users.name, name),
    });
  }
}
