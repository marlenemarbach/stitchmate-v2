import { notFound, redirect } from "next/navigation";
import z from "zod";
import {
  createSubCounterByProjectId,
  getCurrentUser,
  getProjectById,
  updateSubCounterById,
} from "../../lib/dal";
import { SubCounter } from "../../lib/types";
import { ActionResponse } from "./types";

const SubCounterSchema = z.object({
  type: z.enum(["increase", "decrease", "shortRow", "patternRepeat"]),
  interval: z.coerce.number().gte(1),
  startRow: z.coerce.number().gte(1),
  active: z.boolean(),
});

export async function createReminder(
  projectId: number,
  formData: FormData,
): Promise<ActionResponse> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const project = await getProjectById(projectId, user.id);

  if (!project) notFound();

  if (project.subCounter) {
    return {
      success: false,
      message: "A reminder for this project already exists",
      error: "Reminder already exists",
    };
  }

  const validatedFields = SubCounterSchema.pick({
    type: true,
    interval: true,
  }).safeParse({
    type: formData.get("type"),
    interval: formData.get("interval"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const newReminder = {
    type: validatedFields.data.type,
    interval: validatedFields.data.interval,
    startRow: project.count,
  };

  const result = await createSubCounterByProjectId(projectId, newReminder);

  if (!result) {
    return {
      success: false,
      message: "failed",
    };
  }

  return {
    success: true,
    message: "Reminder created successfully",
  };
}

export async function updateReminder(
  projectId: number,
  formData: FormData,
): Promise<ActionResponse & { subCounter?: SubCounter }> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const project = await getProjectById(projectId, user.id);
  if (!project || !project.subCounter) notFound();

  const validationResult = SubCounterSchema.partial().safeParse({
    type: formData.get("type"),
    interval: formData.get("interval"),
    startRow: project.count,
    active: !formData.get("isDisabled"),
  });

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validaton Failed",
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }

  const updatedSubCounter = await updateSubCounterById(
    project.id,
    validationResult.data,
  );

  if (!updatedSubCounter) {
    return {
      success: false,
      message: "Failed to update reminder",
      error: "failed",
    };
  }

  return {
    success: true,
    message: "Updated reminder successfully",
    subCounter: updatedSubCounter,
  };
}
