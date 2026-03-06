import { use } from "react";
import { Project } from "@/lib/types";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectOrderButtons } from "./ProjectOrderButtons";
import {
  DataColumnHeader,
  DataList,
  DataListContent,
  DataListHeader,
} from "./ui/DataList";

export function ProjectList({ projects }: { projects: Promise<Project[]> }) {
  const allProjects = use(projects);

  return (
    <DataList>
      <DataListHeader className="top-14">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-lg font-medium">My Projects</h1>
          <CreateProjectDialog />
        </div>
        {allProjects.length > 0 && (
          <DataColumnHeader className="mx-auto pb-2">
            <ProjectOrderButtons />
          </DataColumnHeader>
        )}
      </DataListHeader>
      {!allProjects.length ? (
        <div className="flex max-w-xs flex-1 flex-col items-center justify-center gap-6 self-center justify-self-center">
          <div className="flex items-end gap-3">
            <p className="text-muted-foreground">No projects</p>
          </div>
        </div>
      ) : (
        <DataListContent className="mx-auto mt-42 sm:mt-51">
          {allProjects.map((project) => {
            return <ProjectListItem key={project.id} project={project} />;
          })}
        </DataListContent>
      )}
    </DataList>
  );
}
