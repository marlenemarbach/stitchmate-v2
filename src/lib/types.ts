import { InferSelectModel } from "drizzle-orm";
import { projects, subCounters } from "@/db/schema";

export type SubCounter = InferSelectModel<typeof subCounters>;
export type Project = InferSelectModel<typeof projects>;
export type ProjectStatus = Project["status"];
export type SubCounterType = SubCounter["type"];

export type CountDirection = 1 | -1;

export type ProjectWithSubCounter = Project & {
  subCounter: SubCounter;
};
