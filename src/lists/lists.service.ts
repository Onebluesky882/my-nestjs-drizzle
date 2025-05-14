import { Inject, Injectable } from '@nestjs/common';
import { schema } from 'src/database/schema';
import { lists } from './schema';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class ListsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // get all and filter
  async getAllTitle() {
    return this.db.query.lists.findMany();
  }

  // get by id
  async getPostById(id: string) {
    return this.db.query.lists.findFirst({ where: eq(lists.id, id) });
  }
  //post
  async insert(data: { title: string; content: string }) {
    return this.db
      .insert(lists)
      .values({ title: data.title, content: data.title })
      .returning();
  }
  // update
  async updateById(id: string, data: { title: string; content: string }) {
    return this.db
      .update(lists)
      .set({
        title: data.title,
        content: data.content,
      })
      .where(eq(lists.id, id))
      .returning();
  }

  async delete(id: string) {
    return this.db.delete(lists).where(eq(lists.id, id)).returning();
  }
}
