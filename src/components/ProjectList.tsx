"use client";

import { use, useRef } from "react";
import { Project } from "@/lib/types";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectOrderButtons } from "./ProjectOrderButtons";

export function ProjectList({ projects }: { projects: Promise<Project[]> }) {
  const allProjects = use(projects);

  const contentRef = useRef<HTMLDivElement>(null);

  function handleUpAndDownArrowKeys(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    if (!contentRef.current) return;

    const listItems = Array.from(
      contentRef.current.querySelectorAll<HTMLElement>("[data-list-item]"),
    );
    const index = listItems.indexOf(document.activeElement as HTMLElement);

    if (e.key === "ArrowDown") {
      listItems[index + 1]?.focus();
    } else {
      listItems[index - 1]?.focus();
    }
  }

  return (
    <>
      <div className="fixed top-14 flex w-screen items-center justify-between bg-background px-4 py-3">
        <h1 className="text-lg font-medium">My Projects</h1>
        <CreateProjectDialog />
      </div>

      {/* -------------- main grid -------------- */}
      <div className="grid w-full max-w-2xl grid-cols-[1fr_auto] sm:grid-cols-[1fr_6rem_8.3rem_3rem]">
        {/* -------------- header -------------- */}
        {allProjects.length > 0 && (
          <div className="fixed top-28 col-span-4 grid w-full max-w-2xl grid-cols-[auto_auto_1fr] items-start bg-background mask-b-from-80% mask-b-to-90% py-2 sm:grid-cols-[1fr_6rem_8.3rem_3rem]">
            <ProjectOrderButtons />
          </div>
        )}

        {/* -------------- content -------------- */}
        {!allProjects.length ? (
          <div className="flex max-w-xs flex-1 flex-col items-center justify-center gap-6 self-center justify-self-center">
            <div className="flex items-end gap-3">
              <p className="text-muted-foreground">No projects</p>
            </div>
          </div>
        ) : (
          <div
            className="col-span-2 mt-40 grid w-full grid-cols-subgrid grid-rows-2 overflow-y-auto sm:col-span-4 sm:mb-16 sm:grid-rows-1"
            ref={contentRef}
            onKeyDown={(e) => handleUpAndDownArrowKeys(e)}
          >
            {allProjects.map((project) => {
              return <ProjectListItem key={project.id} project={project} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
