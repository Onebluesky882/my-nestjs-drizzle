import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { date } from 'drizzle-orm/mysql-core';

export const lists = pgTable('lists', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  content: text('content'),
  create_at: timestamp('create_at').notNull().defaultNow(),
});
