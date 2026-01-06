import { notFound, redirect } from "next/navigation";
import z from "zod";
import {
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

export async function updateSubCounter(
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
