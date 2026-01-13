import { notFound, redirect } from "next/navigation";
import z from "zod";
import {
  getCurrentUser,
  getProjectById,
  updateSubCounterById,
} from "../lib/dal";
import { SubCounter } from "../lib/types";
import { ActionResponse } from "./types";

export const SubCounterSchema = z.object({
  interval: z.coerce.number().gte(1).lte(99),
  startRow: z.coerce.number().gte(1),
  active: z.boolean(),
});

export async function updateSubCounter(
  projectId: number,
  data: Partial<SubCounter>,
): Promise<ActionResponse & { subCounter?: SubCounter }> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const project = await getProjectById(projectId, user.id);
  if (!project || !project.subCounter) notFound();

  const validationResult = SubCounterSchema.partial().safeParse({
    interval: data.interval,
    startRow: project.count,
    active: data.active,
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
      message: "Failed to update subcounter",
      error: "failed",
    };
  }

  return {
    success: true,
    message: "Updated subcounter successfully",
    subCounter: updatedSubCounter,
  };
}
