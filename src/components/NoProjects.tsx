"use client";

import { Plus } from "lucide-react";
import {
  CreateProjectDialog,
  CreateProjectDialogTrigger,
} from "./CreateProjectDialog";

export function NoProjects() {
  return (
    <CreateProjectDialog>
      <CreateProjectDialogTrigger>
        <button className="m-auto cursor-pointer">
          <div className="hover:bg-card/80 m-auto h-[8rem] transition-[border,background] duration-200 ease-out hover:border-foreground/40 sm:w-sm">
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
