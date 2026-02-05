import { use } from "react";
import { Boxes, Plus } from "lucide-react";
import { Project } from "@/lib/types";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { DragListItem } from "./DragListItem";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectSort } from "./ProjectSort";
import { Button } from "./ui/Button";
import { DialogTrigger } from "./ui/Dialog";

//TODO: Make accessible: https://www.w3.org/WAI/ARIA/apg/patterns/grid/
export function ProjectList({ projects }: { projects: Promise<Project[]> }) {
  const allProjects = use(projects);

  if (!allProjects.length) {
    return (
      <div className="m-auto flex h-screen max-w-xs flex-col items-center justify-center gap-6">
        <div className="flex items-end gap-3">
          <Boxes className="size-8 stroke-1 text-foreground/70" />
          <h1 className="text-md text-center text-xl font-medium">Projects</h1>
        </div>

        <p className="text-center text-balance text-muted-foreground">
          Press the button below to create your first project and start
          crafting.
        </p>
        <CreateProjectDialog>
          <DialogTrigger asChild>
            <Button className="my-2 w-fit">
              <Plus className="stroke-3" />
              Add Project
            </Button>
          </DialogTrigger>
        </CreateProjectDialog>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-16 z-1 grid w-full gap-4 bg-background mask-b-from-85% mask-b-to-95% pr-1 pb-3 sm:gap-6 sm:pt-10 sm:pr-2 sm:pl-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-medium">My Projects</h1>
          <CreateProjectDialog>
            <DialogTrigger asChild>
              <Button className="my-2 w-fit">
                <Plus className="stroke-3" />
                Add Project
              </Button>
            </DialogTrigger>
          </CreateProjectDialog>
        </div>

        <ProjectSort projects={projects} />
      </div>

      <div className="my-14 hidden gap-3 sm:grid">
        {allProjects.map((project) => {
          return <ProjectListItem key={project.id} project={project} />;
        })}
      </div>
      <div className="my-12 grid sm:my-10 sm:hidden sm:gap-3">
        {allProjects.map((project) => {
          return <DragListItem key={project.id} project={project} />;
        })}
      </div>
    </>
  );
}
