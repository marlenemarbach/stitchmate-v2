"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { toast } from "sonner";
import { updateProject } from "@/actions/projects";
import { PROJECT_STATUSES } from "@/lib/constants";
import { type Project, ProjectStatus } from "@/lib/types";
import { calculateTimeSince } from "@/lib/utils";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { EditProjectDialog } from "./EditProjectDialog";
import { ProjectDropdownMenu } from "./ProjectDropdownMenu";
import { ProjectStatusMenu } from "./ProjectStatusMenu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/ContextMenu";
import { StatusBadge } from "./ui/StatusBadge";

export function ProjectListItem({ project }: { project: Project }) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  console.log(showEditDialog);

  const [isPending, startTransition] = useTransition();

  function updateProjectStatus(newStatus: ProjectStatus) {
    if (newStatus === project.status) return;

    startTransition(async () => {
      const data = { status: newStatus };
      try {
        const result = await updateProject(data, project.id);
        if (!result.success) {
          toast.error(`Something went wrong while updating ${project.name}`);
        }
        return;
      } catch (e) {
        console.error("update project status error:", e);
        toast.error(`Something went wrong while updating ${project.name}`);
      }
    });
  }

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Link
            className="col-span-2 grid min-h-11 cursor-default grid-cols-subgrid items-center gap-x-2 gap-y-1 border-b border-border/50 px-4 py-3 focus-visible:bg-foreground/3 focus-visible:outline-none sm:col-span-4 sm:rounded-full sm:border-none sm:py-2 sm:focus-within:bg-foreground/3 sm:hover:bg-foreground/3 sm:has-[[data-state=open]]:bg-foreground/3"
            href={`/projects/${project.id}`}
            data-list-item
          >
            <h3 className="font-medium">{project.name}</h3>

            <div className="align-center row-start-2 grid grid-cols-[20px_auto] sm:col-span-2 sm:row-start-auto sm:grid-cols-subgrid">
              <ProjectStatusMenu
                status={project.status}
                onStatusChange={updateProjectStatus}
                isPending={isPending}
              />
              <p className="mt-0.5 text-sm text-muted-foreground sm:mt-0">
                {calculateTimeSince(project.updatedAt)}
              </p>
            </div>

            <ProjectDropdownMenu
              status={project.status}
              onStatusChange={updateProjectStatus}
              setShowDeleteDialog={setShowDeleteDialog}
              setShowEditDialog={setShowEditDialog}
            />
          </Link>
        </ContextMenuTrigger>

        <ContextMenuContent loop onClick={(e) => e.preventDefault()}>
          <ContextMenuItem onSelect={() => setShowEditDialog(true)}>
            <PencilIcon />
            <span className="col-start-2">Edit...</span>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup
            value={project.status}
            onValueChange={(value) =>
              updateProjectStatus(value as ProjectStatus)
            }
          >
            <ContextMenuLabel>Status</ContextMenuLabel>
            {PROJECT_STATUSES.map((status) => (
              <ContextMenuRadioItem key={status} value={status}>
                <StatusBadge className="size-4" status={status} />
                {status}
              </ContextMenuRadioItem>
            ))}
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={() => setShowDeleteDialog(true)}>
            <TrashIcon /> Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

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
