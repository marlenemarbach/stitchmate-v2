import { redirect } from "next/navigation";
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
      />
      <main className="grid px-6 pt-4">
        <CounterWithToolbar project={project} />
      </main>
    </>
  );
}
