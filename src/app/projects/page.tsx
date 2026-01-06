"use server";

import { Suspense } from "react";
import { getAllProjects } from "@/actions/projects";
import { Header } from "@/components/Header";
import { ProjectList } from "@/components/ProjectList";
import { SignOutButton } from "@/components/SignOutButton";
import { Spinner } from "@/components/ui/Spinner";

export default async function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <Header className="top-0 border-b border-border">
        <h1 className="pl-2">My Projects</h1>
        <SignOutButton className="col-start-3 justify-self-end" />
      </Header>
      <main className="flex flex-1 flex-col gap-y-4 px-6">
        <Suspense fallback={<Spinner />}>
          <ProjectList projects={projects} />
        </Suspense>
      </main>
    </>
  );
}
