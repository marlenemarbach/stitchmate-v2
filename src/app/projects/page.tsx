import { redirect } from "next/navigation";
import z from "zod";
import { Header } from "@/components/Header";
import { ProjectList } from "@/components/ProjectList";
import { ProjectListPagination } from "@/components/ProjectListPagination";
import {
  getCurrentUser,
  getNumberOfProjectPages,
  getProjectsByUserId,
} from "@/lib/dal";

const PAGELENGTH = 20;

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    page?: string;
    statusOrder?: "desc" | "asc";
    updatedOrder?: "desc" | "asc";
    nameOrder?: "desc" | "asc";
  }>;
}) {
  const searchParams = await props.searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const ProjectListSchema = z.object({
    page: z.coerce.number().int().min(1).catch(1),
    updatedOrder: z.enum(["desc", "asc"]).catch("desc"),
    statusOrder: z.enum(["desc", "asc"]).optional(),
    nameOrder: z.enum(["desc", "asc"]).optional(),
  });

  const validatedParams = ProjectListSchema.parse({
    page: searchParams?.page,
    updatedOrder: searchParams?.updatedOrder,
    statusOrder: searchParams?.statusOrder,
    nameOrder: searchParams?.nameOrder,
  });

  const order = {
    status: validatedParams.statusOrder,
    updatedAt: validatedParams.updatedOrder,
    name: validatedParams.nameOrder,
  };

  const projects = getProjectsByUserId(
    user.id,
    order,
    validatedParams.page,
    PAGELENGTH,
  );
  const pages = await getNumberOfProjectPages(user.id, PAGELENGTH);

  if (validatedParams.page > pages) {
    redirect(`/projects?page=${pages}`);
  }

  return (
    <>
      <Header
        isGuest={user.role === "guest"}
        className="fixed top-0 w-full bg-background sm:border-b sm:border-border sm:pb-[calc(0.75rem-1px)]"
      />

      <main className="flex w-screen flex-1 flex-col items-center">
        <ProjectList projects={projects} />
        {pages > 1 && (
          <ProjectListPagination
            pageCount={pages}
            currentPage={validatedParams.page}
          />
        )}
      </main>
    </>
  );
}
