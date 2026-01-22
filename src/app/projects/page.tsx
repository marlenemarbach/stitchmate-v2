"use server";

import { Suspense } from "react";
import { Menu, PanelLeft, Sun } from "lucide-react";
import { Header } from "@/components/Header";
import { ProjectList } from "@/components/ProjectList";
import { ProjectListHeader } from "@/components/ProjectListHeader";
import { ProjectSort } from "@/components/ProjectSort";
import { SignOutButton } from "@/components/SignOutButton";
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
      <Header className="fixed top-0 z-2 w-full border-b border-border/50 bg-background">
        <h1 className="pl-2">S</h1>

        <div className="flex items-center gap-4">
          <Sun className="size-5" />
          <SignOutButton className="justify-self-end" />
        </div>
      </Header>
      <main className="flex w-[calc(100vw-2rem)] max-w-3xl flex-1 flex-col items-center place-self-center bg-background">
        <Suspense fallback={<Spinner />}>
          <div className="sticky top-16 z-1 grid gap-8 bg-background mask-b-from-70% mask-b-to-90% pt-10 pr-2 pb-8 pl-4">
            <ProjectListHeader />
            <ProjectSort
              updatedOrder={searchParams?.updatedOrder}
              statusOrder={searchParams?.statusOrder}
            />
          </div>
          <ProjectList searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
