"use server";

import { Suspense } from "react";
import { Header } from "@/components/Header";
import { ProjectList } from "@/components/ProjectList";
import { SignOutButton } from "@/components/SignOutButton";
import { StatusOrderButton } from "@/components/StatusOrderButton";
import { UpdatedOrderButton } from "@/components/UpdatedOrderButton";
import { Spinner } from "@/components/ui/Spinner";

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    statusOrder?: "desc" | "asc";
    updatedOrder?: "desc" | "asc";
  }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <Header className="top-0">
        <h1 className="pl-2">My Projects</h1>
        <SignOutButton className="col-start-3 justify-self-end" />
      </Header>
      <main className="relative mt-6 w-[calc(100vw-2rem)] max-w-3xl flex-1 place-self-center bg-background [mask-image:linear-gradient(to_bottom,black_0%,black_calc(100%-2rem),transparent_100%)] px-6">
        <Suspense fallback={<Spinner />}>
          <div className="sticky top-6 z-1 mb-3 grid grid-cols-6 items-center border-b border-border px-4 text-muted-foreground">
            <span className="col-span-4 text-sm">Name</span>
            <StatusOrderButton statusOrder={searchParams?.statusOrder} />
            <UpdatedOrderButton updatedOrder={searchParams?.updatedOrder} />
          </div>
          <ProjectList searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
