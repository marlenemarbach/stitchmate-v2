import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  email: text(),
  password: text(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const projects = sqliteTable("projects", {
  id: integer().primaryKey({ autoIncrement: true }),
  user_id: integer("userId").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  name: text("name").notNull(),
});

export const counter = sqliteTable("counter", {
  id: integer().primaryKey({ autoIncrement: true }),
  project_id: integer("projectId").notNull(),
  order: integer("order").notNull(),
  count: integer().default(1),
  direction: text({ enum: ["up", "down"] }).default("up"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const reminder = sqliteTable("reminder", {
  id: integer().primaryKey({ autoIncrement: true }),
  counter_id: integer("projectId").notNull(),
  kind: text({ enum: ["shortRows", "increase", "decrease"] }).default(
    "shortRows",
  ),
  count: integer().default(1),
  step: integer().default(1),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  startRow: integer("start_row"),
  endRow: integer("end_row"),
});
