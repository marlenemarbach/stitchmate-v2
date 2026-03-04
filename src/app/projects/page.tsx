import { redirect } from "next/navigation";
import z from "zod";
import { Header } from "@/components/Header";
import { ProjectList } from "@/components/ProjectList";
import { getCurrentUser, getProjectsByUserId } from "@/lib/dal";

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    statusOrder?: "desc" | "asc";
    updatedOrder?: "desc" | "asc";
    nameOrder?: "desc" | "asc";
  }>;
}) {
  const searchParams = await props.searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const ProjectListSchema = z.object({
    updatedOrder: z.enum(["desc", "asc"]).catch("desc"),
    statusOrder: z.enum(["desc", "asc"]).optional(),
    nameOrder: z.enum(["desc", "asc"]).optional(),
  });

  const validatedParams = ProjectListSchema.parse({
    updatedOrder: searchParams?.updatedOrder,
    statusOrder: searchParams?.statusOrder,
    nameOrder: searchParams?.nameOrder,
  });

  const order = {
    status: validatedParams.statusOrder,
    updatedAt: validatedParams.updatedOrder,
    name: validatedParams.nameOrder,
  };

  const projects = getProjectsByUserId(user.id, order);

  return (
    <>
      <Header
        isGuest={user.role === "guest"}
        className="fixed top-0 z-2 w-full bg-background sm:border-b sm:border-border"
      />

      <main className="mx-auto mb-auto w-screen max-w-3xl">
        <ProjectList projects={projects} />
      </main>
    </>
  );
}
