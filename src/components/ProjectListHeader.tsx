"use client";

import { CreateProjectDialog } from "./CreateProjectDialog";

// import { EditProjectDialog } from "./EditProjectDialog";

export function ProjectListHeader() {
  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="text-xl font-semibold">My Projects</h1>
      <CreateProjectDialog />
      {/* <EditProjectDialog project={project}/> */}
    </div>
  );
}
