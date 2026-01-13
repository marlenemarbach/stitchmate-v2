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
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const userRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export const projects = sqliteTable("projects", {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: text()
    .notNull()
    .references(() => users.id),
  count: integer().notNull().default(1),
  direction: integer().notNull().default(1),
  name: text({ length: 30 }).notNull(),
  needleSize: text(),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text()
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  status: text({ enum: ["wip", "finished"] })
    .notNull()
    .default("wip"),
});

export const projectRelations = relations(projects, ({ one }) => ({
  subCounter: one(subCounters),
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export const subCounters = sqliteTable("sub_counters", {
  id: integer().primaryKey({ autoIncrement: true }),
  projectId: integer()
    .notNull()
    .unique()
    .references(() => projects.id),
  type: text({ enum: ["shortRow", "increase", "decrease", "patternRepeat"] })
    .notNull()
    .default("increase"),
  interval: integer().notNull().default(2),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text()
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  startRow: integer().notNull().default(1),
  active: integer({ mode: "boolean" }).notNull().default(false),
});

export const subCounterRelations = relations(subCounters, ({ one }) => ({
  project: one(projects, {
    fields: [subCounters.projectId],
    references: [projects.id],
  }),
}));
