import { asc, desc } from "drizzle-orm";
import { projects } from "@/db/schema";

export type ProjectOrderParams = {
  name?: "desc" | "asc";
  status?: "desc" | "asc";
  updatedAt?: "desc" | "asc";
};

export function generateOrderByClause(order: ProjectOrderParams) {
  const orderByClause = [];

  // Name takes precedence
  if (order.name) {
    orderByClause.push(
      order.name === "asc" ? asc(projects.name) : desc(projects.name),
    );
  }

  if (order.status) {
    orderByClause.push(
      order.status === "asc" ? asc(projects.status) : desc(projects.status),
    );
  }

  // Default: updatedAt desc if nothing else set
  const updatedAtOrder = order.updatedAt ?? "desc";
  orderByClause.push(
    updatedAtOrder === "asc"
      ? asc(projects.updatedAt)
      : desc(projects.updatedAt),
  );

  return orderByClause;
}
