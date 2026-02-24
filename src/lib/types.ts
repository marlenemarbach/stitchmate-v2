import { InferSelectModel } from "drizzle-orm";
import { projects, subCounters, users } from "@/db/schema";

export type Project = InferSelectModel<typeof projects>;
export type ProjectStatus = Project["status"];
export type ProjectOrder = "asc" | "desc";

export type SubCounter = InferSelectModel<typeof subCounters>;

export type CountDirection = 1 | -1;

export type ProjectWithSubCounter = Project & {
  subCounter: SubCounter;
};

export type User = InferSelectModel<typeof users>;
