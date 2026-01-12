import Link from "next/link";
import { List } from "lucide-react";
import { getProject } from "@/actions/projects";
import { CounterPageTitle } from "@/components/CounterPageTitle";
import { CounterWithToolbar } from "@/components/CounterWithToolbar";
import { Header } from "@/components/Header";
import { SignOutButton } from "@/components/SignOutButton";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const project = getProject(params);

  return (
    <>
      <Header className="items-baseline">
        <Link
          href="/projects"
          className="flex size-9 items-center justify-center rounded-full hover:bg-foreground/5"
        >
          <List className="size-5" />
        </Link>
        <CounterPageTitle project={project} />
        <SignOutButton className="col-start-3 justify-self-end" />
      </Header>
      <main className="relative grid flex-1 grid-rows-[auto_1fr_auto] place-content-center justify-center gap-y-4 px-6 pt-4">
        <CounterWithToolbar project={project} />
      </main>
    </>
  );
}
