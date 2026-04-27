import { Project, ProjectWithSubCounter } from "@/lib/types";

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export type ProjectActionResponse = ActionResponse & {
  project?: ProjectWithSubCounter | Project;
};
