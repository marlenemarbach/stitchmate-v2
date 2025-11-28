import { beforeEach, mock } from "bun:test";
import { LibSQLDatabase, drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "./schema";

export function setupTestDb() {
  let db: LibSQLDatabase<typeof schema>;

  beforeEach(async () => {
    db = drizzle(":memory:", { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });
    mock.module("@/db", () => ({ db }));
  });

  return () => db;
}
