"use server";

import { refresh, revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import z from "zod";
import {
  createProjectByUserId,
  deleteProjectById,
  getAllProjectsByUserId,
  getCurrentUser,
  getProjectById,
  updateProjectById,
} from "@/lib/dal";
import { Project, ProjectWithSubCounter } from "@/lib/types";
import { mockDelay } from "@/lib/utils";
import { ActionResponse } from "./types";

const ProjectSchema = z.object({
  name: z
    .string("Please enter a name with at least one character")
    .trim()
    .min(1, "Project name cannot be empty or only whitespace")
    .max(30, "Project name cannot be longer than 30 characters"),
  needleSize: z.string().nullable(),
  count: z.number().gte(1),
  direction: z.union([z.literal(1), z.literal(-1)]),
  status: z.enum(["wip", "finished"]),
});

export type ProjectData = z.infer<typeof ProjectSchema>;

export async function createProject(data: {
  name: string;
}): Promise<ActionResponse & { project?: ProjectWithSubCounter }> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const validatedFields = ProjectSchema.pick({ name: true }).safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { name } = validatedFields.data;
  const newProject = await createProjectByUserId(user.id, name);

  if (!newProject) {
    return {
      success: false,
      message: "Project could not be created.",
      error: "failed",
    };
  }

  return {
    success: true,
    message: "Project created successfully",
    project: newProject,
  };
}

export async function updateProject(
  data: Partial<ProjectData>,
  projectId: number,
): Promise<ActionResponse & { project?: Project }> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // await mockDelay(1000);

  const project = await getProjectById(projectId, user.id);
  if (!project) notFound();

  const validationResult = ProjectSchema.partial().safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }

  const updatedProject = await updateProjectById(
    validationResult.data,
    projectId,
    user.id,
  );

  if (!updatedProject) {
    return {
      success: false,
      message: "Failed to update project",
      error: "failed",
    };
  }
  revalidatePath("projects");

  return {
    success: true,
    message: "Project updated successfully",
    project: updatedProject,
  };
}

export async function deleteProject(
  projectId: number,
): Promise<ActionResponse> {
  const user = await getCurrentUser();
  if (!user) redirect("./login");

  const deletedProject = await deleteProjectById(projectId, user.id);

  if (!deletedProject) {
    return {
      success: false,
      message: "Error deleting project",
      error: "failed",
    };
  }
  refresh();
  return {
    success: true,
    message: "Project deleted successfully",
  };
}

export async function getProject(params: Promise<{ id: string }>) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const awaitedParams = await params;
  const { id } = awaitedParams;
  const project = await getProjectById(parseInt(id), user.id);
  if (!project) notFound();

  return project;
}

export async function getAllProjects() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const projects = await getAllProjectsByUserId(user.id);
  return projects;
}
