"use client";

import { useTransition } from "react";
import { Loader, Trash } from "lucide-react";
import { deleteProject } from "../actions/projects";
import { Button } from "./ui/Button";

export function DeleteProjectButton({
  disabled,
  projectId,
}: {
  disabled?: boolean;
  projectId: number;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      disabled={disabled}
      className="w-9 bg-muted hover:bg-muted-foreground/15"
      onClick={() => {
        startTransition(async () => {
          await deleteProject(projectId);
        });
      }}
    >
      <Trash className="text-destructive-foreground" />
      {isPending && (
        <Loader className="absolute top-16 left-1/2 z-10 size-4 -translate-x-1/2 animate-spin" />
      )}
    </Button>
  );
}
