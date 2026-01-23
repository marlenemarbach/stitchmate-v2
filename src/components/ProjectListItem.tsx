"use client";

import { useState } from "react";
import Link from "next/link";
import { Ellipsis, Trash } from "lucide-react";
import { updateProject } from "@/actions/projects";
import { type Project, ProjectStatus } from "@/lib/types";
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

  function handleStatusChange(newStatus: ProjectStatus) {
    updateProject({ status: newStatus }, project.id);
  }

  return (
    <>
      <div className="grid grid-cols-12 items-center gap-2 rounded-xl py-2 pr-2 pl-4 hover:bg-foreground/5">
        <Link
          href={`/projects/${project.id}`}
          className="col-span-11 grid grid-cols-subgrid"
        >
          <h3 className="col-span-7">{project.name}</h3>
          <StatusBadge status={project.status} />
          <p className="col-span-2 col-start-10 text-sm text-muted-foreground">
            {calculateTimeSince(project.updatedAt)}
          </p>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="place-self-end">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
              Edit...
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={project.status}
              onValueChange={(value) =>
                handleStatusChange(value as ProjectStatus)
              }
            >
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuRadioItem
                value="wip"
                onSelect={(e) => e.preventDefault()}
              >
                wip
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="finished"
                onSelect={(e) => e.preventDefault()}
              >
                finished
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
              <Trash className="text-destructive" /> Delete
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

function calculateTimeSince(date: string) {
  const projectDate = new Date(date);
  const today = new Date();

  // Reset time to midnight
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const startOfGivenDate = new Date(
    projectDate.getFullYear(),
    projectDate.getMonth(),
    projectDate.getDate(),
  );

  const diffInMs = startOfToday.getTime() - startOfGivenDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "today";
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;

  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }

  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }

  const years = Math.floor(diffInDays / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}
