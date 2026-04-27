import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Ellipsis } from "lucide-react";
import { PROJECT_STATUSES } from "@/lib/constants";
import { ProjectStatus } from "@/lib/types";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioIndicator,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { StatusBadge } from "./ui/StatusBadge";

type ProjectdropdownMenuProps = {
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onStatusChange: (status: ProjectStatus) => void;
  status: ProjectStatus;
};

export function ProjectDropdownMenu({
  setShowDeleteDialog,
  setShowEditDialog,
  onStatusChange,
  status,
}: ProjectdropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.preventDefault()} asChild>
        <Button
          className="row-start-1 row-end-3 my-auto place-self-end hover:bg-transparent sm:row-span-1 dark:hover:bg-transparent dark:hover:text-foreground dark:focus-visible:text-foreground dark:data-[state=open]:text-foreground"
          variant="ghost"
          size="icon"
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        loop
        onClick={(e) => e.preventDefault()}
        side="bottom"
        align="end"
      >
        <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
          <PencilIcon />
          <span className="col-start-2">Edit...</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={(value) => onStatusChange(value as ProjectStatus)}
        >
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          {PROJECT_STATUSES.map((status) => (
            <DropdownMenuRadioItem key={status} value={status}>
              <StatusBadge className="size-4" status={status} />
              {status}
              <DropdownMenuRadioIndicator />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
          <TrashIcon /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
