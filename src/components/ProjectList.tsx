import { use } from "react";
import { Boxes } from "lucide-react";
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
        <div className="flex w-full items-center justify-between pr-4 pl-4 sm:pr-0">
          <h1 className="text-xl font-medium">My Projects</h1>
          <CreateProjectDialog />
        </div>
        {allProjects.length > 0 && (
          <DataColumnHeader className="pb-2">
            <ProjectOrderButtons />
          </DataColumnHeader>
        )}
      </DataListHeader>
      {!allProjects.length ? (
        <div className="m-auto flex h-screen max-w-xs flex-col items-center justify-center gap-6">
          <div className="flex items-end gap-3">
            <Boxes className="size-8 stroke-1 text-foreground/70" />
            <h1 className="text-md text-center text-xl font-medium">
              Projects
            </h1>
          </div>

          <p className="text-center text-balance text-muted-foreground">
            No projects yet.
          </p>
        </div>
      ) : (
        <DataListContent className="mt-42 sm:mt-51">
          {allProjects.map((project) => {
            return <ProjectListItem key={project.id} project={project} />;
          })}
        </DataListContent>
      )}
    </DataList>
  );
}
