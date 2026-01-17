"use server";

import { Suspense } from "react";
import { Header } from "@/components/Header";
import { ProjectFilter } from "@/components/ProjectFilter";
import { ProjectList } from "@/components/ProjectList";
import { ProjectOrderToggle } from "@/components/ProjectOrderToggle";
import { SignOutButton } from "@/components/SignOutButton";
import { Spinner } from "@/components/ui/Spinner";

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    order?: string;
    filter?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const order = searchParams?.order ?? "";
  const filter = searchParams?.filter ?? "";

  return (
    <>
      <Header className="top-0 border-b border-border">
        <h1 className="pl-2">My Projects</h1>
        <SignOutButton className="col-start-3 justify-self-end" />
      </Header>
      <main className="relative mt-6 flex w-[calc(100vw-2rem)] max-w-xl flex-1 flex-col gap-6 place-self-center bg-background [mask-image:linear-gradient(to_bottom,black_0%,black_calc(100%-2rem),transparent_100%)] px-6">
        <Suspense fallback={<Spinner />}>
          <div className="sticky top-6 z-1 flex gap-3">
            <ProjectOrderToggle order={order} />
            <ProjectFilter filter={filter} />
          </div>
          <ProjectList searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
