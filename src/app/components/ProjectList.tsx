"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { CalendarArrowDown, CalendarArrowUp, Plus } from "lucide-react";
import { Project } from "@/lib/types";
import { dummyProjects } from "../projects/mockProjects";
import {
  CreateProjectDialog,
  CreateProjectDialogTrigger,
} from "./CreateProjectDialog";
import { ProjectFilter, ProjectFilterPills } from "./ProjectFilterPills";
import { ProjectListItem } from "./ProjectListItem";
import { Button } from "./ui/Button";

type ProjectOrder = "asc" | "desc";

export function ProjectList({
  projects,
}: {
  projects: Promise<Project[] | null>;
}) {
  const allProjects = use(projects);
  // const allProjects = dummyProjects;
  if (!allProjects) notFound();

  const [projectOrder, setProjectOrder] = useState<ProjectOrder>("desc");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");

  const displayedProjects = filterProjectsAndSort(
    projectFilter,
    projectOrder,
    allProjects,
  );

  function updateFilter(filter: ProjectFilter) {
    if (filter === projectFilter) return;
    setProjectFilter(filter);
  }

  function updateOrder() {
    if (projectOrder === "asc") setProjectOrder("desc");
    else setProjectOrder("asc");
  }

  if (!allProjects || !allProjects.length) {
    return (
      <CreateProjectDialog>
        <CreateProjectDialogTrigger>
          <button className="m-auto cursor-pointer">
            <div className="m-auto h-[8rem] transition-[border,background] duration-200 ease-out hover:border-foreground/40 hover:bg-card/80 sm:w-sm">
              <h2 className="text-md text-center tracking-wide">
                No projects yet.
                <br /> Create one and start crafting
              </h2>
              <Plus className="m-auto" />
            </div>
          </button>
        </CreateProjectDialogTrigger>
      </CreateProjectDialog>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="sticky top-0 z-1 grid grid-cols-2 grid-rows-2 items-center gap-y-4 bg-background [mask-image:linear-gradient(to_bottom,black_0%,black_calc(100%-2rem),transparent_100%)] px-2 py-8 sm:grid-cols-[auto_1fr_auto] sm:grid-rows-1">
        <Button
          variant="secondary"
          className="row-start-2 sm:row-start-1"
          size="icon"
          onClick={() => updateOrder()}
        >
          {projectOrder === "desc" ? (
            <CalendarArrowDown className="size-4" />
          ) : (
            <CalendarArrowUp className="size-4" />
          )}
        </Button>
        <ProjectFilterPills
          className="col-span-2 sm:col-span-1 sm:justify-self-center"
          projects={allProjects}
          activeFilter={projectFilter}
          updateFilterAction={updateFilter}
        />
        <CreateProjectDialog>
          <CreateProjectDialogTrigger>
            <Button
              variant="secondary"
              size="icon"
              className="justify-self-end"
            >
              <Plus />
            </Button>
          </CreateProjectDialogTrigger>
        </CreateProjectDialog>
      </div>
      <div className="grid-auto-rows group/list grid gap-3 px-2">
        {displayedProjects.map((project) => {
          return <ProjectListItem key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}

function filterProjectsAndSort(
  filter: ProjectFilter,
  order: ProjectOrder,
  projects: Project[],
) {
  let filteredProjects;
  if (filter === "all") {
    filteredProjects = projects;
  } else {
    filteredProjects = projects.filter((project) => project.status === filter);
  }
  if (order === "desc") {
    return filteredProjects.toSorted(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }
  return filteredProjects.toSorted(
    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
  );
}
