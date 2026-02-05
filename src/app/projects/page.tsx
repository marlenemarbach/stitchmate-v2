import { redirect } from "next/navigation";
import z from "zod";
import { Header } from "@/components/Header";
import { ProjectList } from "@/components/ProjectList";
import { SignOutButton } from "@/components/SignOutButton";
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
      <Header className="fixed top-0 z-2 w-full bg-background sm:border-b sm:border-border">
        <h1 className="pl-2">S</h1>
        <div className="flex items-center gap-4">
          <SignOutButton className="justify-self-end" />
        </div>
      </Header>

      <main className="m-auto min-h-screen w-[calc(100vw_-_2rem)] max-w-3xl">
        <ProjectList projects={projects} />
      </main>
    </>
  );
}
