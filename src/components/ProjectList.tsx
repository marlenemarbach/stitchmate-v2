"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { getCurrentUser, getProjectsByUserId } from "@/lib/dal";
import { NoProjects } from "./NoProjects";
import { ProjectListItem } from "./ProjectListItem";

export async function ProjectList({
  searchParams,
}: {
  searchParams?: { order?: string; filter?: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const ProjectListSchema = z.object({
    order: z.enum(["desc", "asc"]).catch("desc"),
    filter: z.enum(["wip", "finished"]).optional(),
  });

  const validatedParams = ProjectListSchema.parse({
    order: searchParams?.order,
    filter: searchParams?.filter,
  });

  const { order, filter } = validatedParams;

  const projects = await getProjectsByUserId(user.id, order, filter);

  if (!projects.length) {
    return <NoProjects />;
  }

  return (
    <div className="grid gap-3 px-2">
      {projects.map((project) => {
        return <ProjectListItem key={project.id} project={project} />;
      })}
    </div>
  );
}
