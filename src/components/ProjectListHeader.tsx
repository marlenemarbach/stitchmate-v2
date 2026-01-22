"use client";

import { CreateProjectDialog } from "./CreateProjectDialog";

export function ProjectListHeader() {
  return (
    <div className="w-full rounded-xl p-4 transition-colors duration-150 ease-out data-[state=open]:bg-zinc-800">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">My Projects</h1>
        <CreateProjectDialog />
      </div>
    </div>
  );
}
