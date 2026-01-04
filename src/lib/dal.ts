"use server";

import { cache } from "react";
import { connection } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects, subCounters, users } from "@/db/schema";
import { ProjectData } from "../app/actions/projects";
import { getSession } from "./auth";
import { SubCounter } from "./types";
import { mockDelay } from "./utils";

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

export async function getAllProjectsByUserId(userId: string) {
  const result = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
    orderBy: [desc(projects.createdAt)],
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
  return project || null;
}

export async function createProjectByUserId(userId: string, name: string) {
  const newProject = await db
    .insert(projects)
    .values({
      userId,
      name,
    })
    .returning();
  return newProject[0];
}

export async function deleteProjectById(projectId: number, userId: string) {
  const result = await db
    .delete(projects)
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
    .returning();
  return result[0];
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

export async function createSubCounterByProjectId(
  projectId: number,
  newSubCounter: Pick<SubCounter, "type" | "interval" | "startRow">,
) {
  const result = await db
    .insert(subCounters)
    .values({
      counterId: projectId,
      type: newSubCounter.type,
      interval: newSubCounter.interval,
      startRow: newSubCounter.startRow,
    })
    .returning();
  return result[0];
}

export async function updateSubCounterById(
  projectId: number,
  data: Partial<SubCounter>,
) {
  const result = await db
    .update(subCounters)
    .set(data)
    .where(and(eq(subCounters.counterId, projectId)))
    .returning();
  return result[0];
}
