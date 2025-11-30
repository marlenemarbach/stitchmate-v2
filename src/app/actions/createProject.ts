"use server";

import z from "zod";
import { getSession } from "../lib/auth";
import { ActionResponse } from "./auth";

const ProjectSchema = z.object({
  name: z.string().min(1),
  needleSize: z.string().optional(),
});

export async function createNewProject(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const session = getSession();

    if (!session) {
      return {
        success: false,
        message: "authorisation failed",
        error: "unauthorized",
      };
    }

    const validatedFields = ProjectSchema.safeParse({
      name: formData.get("projectName"),
      needleSize: formData.get("needleSize"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const { name, needleSize } = validatedFields.data;
    const newProject = await createProject(name, needleSize);
  } catch (error) {
    console.error("create project error:", error);
    return {
      success: false,
      message: "An error occured while creating project",
      error: "Failed to create project",
    };
  }
}
