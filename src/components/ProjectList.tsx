"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { getCurrentUser, getProjectsByUserId } from "@/lib/dal";
import { NoProjects } from "./NoProjects";
import { ProjectListItem } from "./ProjectListItem";

export async function ProjectList({
  searchParams,
}: {
  searchParams?: {
    statusOrder?: string;
    updatedOrder?: string;
  };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const ProjectListSchema = z.object({
    statusOrder: z.enum(["desc", "asc"]).optional(),
    updatedOrder: z.enum(["desc", "asc"]).catch("desc"),
  });

  const validatedParams = ProjectListSchema.parse({
    statusOrder: searchParams?.statusOrder,
    updatedOrder: searchParams?.updatedOrder,
  });

  const order = {
    status: validatedParams.statusOrder,
    updatedAt: validatedParams.updatedOrder,
  };

  const projects = await getProjectsByUserId(user.id, order);

  if (!projects.length) {
    return <NoProjects />;
  }

  return (
    <div className="mt-12 grid w-full gap-3">
      {projects.map((project) => {
        return <ProjectListItem key={project.id} project={project} />;
      })}
    </div>
  );
}
