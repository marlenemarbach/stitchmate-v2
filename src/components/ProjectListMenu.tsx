"use client";

import { useState } from "react";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { updateProject } from "@/actions/projects";
import { Project, ProjectStatus } from "@/lib/types";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { EditProjectDialog } from "./EditProjectDialog";
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
import { StatusBadge } from "./ui/StatusBadge";

export function ProjectListMenu({ project }: { project: Project }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  console.log("showMenu", showMenu, "showEdit", showEditDialog);

  async function handleStatusChange(newStatus: ProjectStatus) {
    try {
      await updateProject({ status: newStatus }, project.id);
    } catch (e) {
      toast.error(`Something went wrong updating "${project.name}".`);
    }
  }

  return (
    <>
      <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="my-auto place-self-end text-muted-foreground hover:bg-transparent hover:text-foreground focus-visible:text-foreground data-[state=active]:text-foreground sm:flex dark:hover:bg-transparent"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent loop>
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
