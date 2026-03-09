import { use } from "react";
import { Project } from "@/lib/types";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectOrderButtons } from "./ProjectOrderButtons";
import { DataList, DataListContent, DataListHeader } from "./ui/DataList";

export function ProjectList({ projects }: { projects: Promise<Project[]> }) {
  const allProjects = use(projects);

  return (
    <>
      <div className="fixed top-14 flex w-full items-center justify-between bg-background px-4 py-3">
        <h1 className="text-lg font-medium">My Projects</h1>
        <CreateProjectDialog />
      </div>
      <DataList>
        {allProjects.length > 0 && (
          <DataListHeader className="fixed top-28 w-full max-w-3xl">
            <ProjectOrderButtons />
          </DataListHeader>
        )}
        {!allProjects.length ? (
          <div className="flex max-w-xs flex-1 flex-col items-center justify-center gap-6 self-center justify-self-center">
            <div className="flex items-end gap-3">
              <p className="text-muted-foreground">No projects</p>
            </div>
          </div>
        ) : (
          <DataListContent className="mt-40">
            {allProjects.map((project) => {
              return <ProjectListItem key={project.id} project={project} />;
            })}
          </DataListContent>
        )}
      </DataList>
    </>
  );
}
