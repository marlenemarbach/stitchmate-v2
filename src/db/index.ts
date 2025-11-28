import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const isTest = process.env.test;

export const db = drizzle(process.env.DB_FILE_NAME!, { schema });
