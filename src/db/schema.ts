import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text().primaryKey(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const counter = sqliteTable("counter", {
  id: integer().primaryKey({ autoIncrement: true }),
  user_id: integer("projectId").notNull(),
  count: integer().notNull().default(1),
  direction: text({ enum: ["up", "down"] })
    .notNull()
    .default("up"),
  name: text("name").notNull(),
  needleSize: text("needle_size"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  status: text({ enum: ["wip", "finished"] })
    .notNull()
    .default("wip"),
});
export const reminder = sqliteTable("reminder", {
  id: integer().primaryKey({ autoIncrement: true }),
  counter_id: integer("projectId").notNull(),
  kind: text({ enum: ["shortRow", "increase", "decrease", "patternRepeat"] })
    .notNull()
    .default("shortRow"),
  count: integer().notNull().default(1),
  step: integer().notNull().default(1),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  startRow: integer("start_row").notNull(),
});
