"use server";

import { cache } from "react";
import { connection } from "next/server";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects, subCounters, users } from "@/db/schema";
import { ProjectData } from "../actions/projects";
import { getSession } from "./auth";
import { ProjectOrderParams, generateOrderByClause } from "./helper";
import { ProjectOrder, ProjectWithSubCounter, SubCounter } from "./types";

/* --------------------------------------------------------------------------
 *  User
 * ------------------------------------------------------------------------*/

export const getCurrentUser = cache(async () => {
  await connection();

  const session = await getSession();
  if (!session) return null;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId));

  return result[0] || null;
});

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return user || null;
}

/* --------------------------------------------------------------------------
 *  Projects
 * ------------------------------------------------------------------------*/

export async function getProjectsByUserId(
  userId: string,
  order: ProjectOrderParams,
) {
  const orderByClause = generateOrderByClause(order);

  const result = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
    orderBy: orderByClause,
    limit: 20,
  });
  return result;
}

export async function getProjectById(id: number, userId: string) {
  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, id), eq(projects.userId, userId)),
    with: {
      subCounter: true,
    },
  });
  return (project as ProjectWithSubCounter) || null;
}

export async function createProjectByUserId(
  userId: string,
  name: string,
): Promise<ProjectWithSubCounter> {
  const result = await db.transaction(async (tx) => {
    const newProject = await tx
      .insert(projects)
      .values({
        userId,
        name,
      })
      .returning();

    const newSubCounter = await tx
      .insert(subCounters)
      .values({ projectId: newProject[0].id })
      .returning();

    const newProjectWithSubCounter = {
      ...newProject[0],
      subCounter: { ...newSubCounter[0] },
    };

    return newProjectWithSubCounter;
  });

  return result;
}

export async function deleteProjectById(projectId: number, userId: string) {
  return await db.transaction(async (tx) => {
    await tx.delete(subCounters).where(eq(subCounters.projectId, projectId));

    await tx
      .delete(projects)
      .where(and(eq(projects.id, projectId), eq(projects.userId, userId)));

    return true;
  });
}

export async function updateProjectById(
  data: Partial<ProjectData>,
  projectId: number,
  userId: string,
) {
  const result = await db
    .update(projects)
    .set(data)
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
    .returning();
  return result[0];
}

/* --------------------------------------------------------------------------
 * Subcounter
 * ------------------------------------------------------------------------*/

export async function updateSubCounterById(
  projectId: number,
  data: Partial<SubCounter>,
) {
  const result = await db
    .update(subCounters)
    .set(data)
    .where(and(eq(subCounters.projectId, projectId)))
    .returning();
  return result[0];
}
