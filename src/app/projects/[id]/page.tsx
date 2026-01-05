import Link from "next/link";
import { List } from "lucide-react";
import { getProject } from "@/app/actions/projects";
import { CountDirectionToggle } from "@/app/components/CountDirectionToggle";
import { CounterPageTitle } from "@/app/components/CounterPageTitle";
import { CounterToolbarMenuBar } from "@/app/components/CounterToolbarMenuBar";
import { Header } from "@/app/components/Header";
import { Reminder } from "@/app/components/Reminder";
import { SignOutButton } from "@/app/components/SignOutButton";
import { Toolbar } from "@/app/components/ui/Toolbar";
import { RowCounter } from "../../components/RowCounter";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const project = getProject(params);

  return (
    <>
      <Header className="top-0 border-b border-border">
        <Link
          href="/projects"
          className="flex size-9 items-center justify-center rounded-full hover:bg-foreground/5"
        >
          <List className="size-5" />
        </Link>
        <CounterPageTitle project={project} />
        <SignOutButton className="col-start-3 justify-self-end" />
      </Header>

      <main className="relative mt-4 mb-8 flex flex-1 flex-col items-center justify-center gap-y-4 px-6">
        <div className="flex w-full flex-row justify-between gap-4 sm:flex-col"></div>
        <div className="flex flex-col gap-6">
          <Reminder />
          <RowCounter project={project} />
        </div>
        <Toolbar aria-label="counter settings">
          <CountDirectionToggle project={project} />
          <CounterToolbarMenuBar project={project} />
        </Toolbar>
      </main>
    </>
  );
}
