import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text().primaryKey(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const userRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export const projects = sqliteTable("projects", {
  id: integer().primaryKey({ autoIncrement: true }),
  user_id: text()
    .notNull()
    .references(() => users.id),
  count: integer().notNull().default(1),
  direction: text({ enum: ["up", "down"] })
    .notNull()
    .default("up"),
  name: text().notNull(),
  needleSize: text(),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  status: text({ enum: ["wip", "finished"] })
    .notNull()
    .default("wip"),
});

export const projectRelations = relations(projects, ({ one }) => ({
  reminder: one(reminder),
  user: one(users, {
    fields: [projects.user_id],
    references: [users.id],
  }),
}));

export const reminder = sqliteTable("reminder", {
  id: integer().primaryKey({ autoIncrement: true }),
  counter_id: integer()
    .notNull()
    .references(() => projects.id),
  kind: text({ enum: ["shortRow", "increase", "decrease", "patternRepeat"] })
    .notNull()
    .default("shortRow"),
  count: integer().notNull().default(1),
  step: integer().notNull().default(1),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  startRow: integer("start_row").notNull(),
});
