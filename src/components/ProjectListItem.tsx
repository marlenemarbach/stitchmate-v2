"use client";

import { useState } from "react";
import Link from "next/link";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { updateProject } from "@/actions/projects";
import { type Project, ProjectStatus } from "@/lib/types";
import { calculateTimeSince } from "@/lib/utils";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { EditProjectDialog } from "./EditProjectDialog";
import { StatusBadge } from "./StatusBadge";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

export function ProjectListItem({ project }: { project: Project }) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  function handleStatusChange(newStatus: ProjectStatus) {
    updateProject({ status: newStatus }, project.id);
  }
  return (
    <>
      <div
        className="grid w-3xl max-w-3xl grid-cols-12 items-center gap-2 py-2 pr-2 pl-4 hover:bg-foreground/5 data-[state=active]:bg-foreground/5 sm:rounded-xl"
        data-state={showMenu ? "active" : "inactive"}
      >
        <Link
          href={`/projects/${project.id}`}
          className="col-span-12 grid cursor-default grid-cols-subgrid grid-rows-2 gap-y-1 sm:col-span-11 sm:grid-rows-1"
        >
          <h3 className="col-span-12 font-medium sm:col-span-7">
            {project.name}
          </h3>
          <StatusBadge status={project.status} className="col-span-2" />
          <p className="translate-y-[3px] text-sm text-muted-foreground sm:col-span-2 sm:col-start-10">
            {calculateTimeSince(project.updatedAt)}
          </p>
        </Link>
        <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="hidden place-self-end text-muted-foreground hover:bg-transparent hover:text-foreground sm:flex dark:hover:bg-transparent"
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
              <Pencil />
              <span className="col-start-2">Edit...</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={project.status}
              onValueChange={(value) =>
                handleStatusChange(value as ProjectStatus)
              }
            >
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuRadioItem value="wip">
                <StatusBadge className="size-4" status="wip" />
                wip
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="finished">
                <StatusBadge className="size-4" status="finished" />
                finished
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <EditProjectDialog
        project={project}
        open={showEditDialog}
        setOpen={setShowEditDialog}
      />
      <DeleteProjectDialog
        project={project}
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
      />
    </>
  );
}
