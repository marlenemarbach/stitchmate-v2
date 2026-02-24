import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { CounterWithToolbar } from "@/components/CounterWithToolbar";
import { Header } from "@/components/Header";
import { getCurrentUser, getProjectById } from "@/lib/dal";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const urlParams = await params;
  const project = await getProjectById(parseInt(urlParams.id), user.id);

  return (
    <>
      <Header
        className="flex justify-between border-b border-border"
        isGuest={user.role === "guest"}
      >
        <Link
          href="/projects"
          className="flex items-center justify-center gap-1 rounded-full p-1 pr-3 hover:bg-foreground/5"
        >
          <ChevronLeft className="size-5" />
          Projects
        </Link>
      </Header>
      <main className="grid px-6 pt-4">
        <CounterWithToolbar project={project} />
      </main>
    </>
  );
}
