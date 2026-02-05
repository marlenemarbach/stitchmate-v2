"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeftToLine, SquarePen, Trash } from "lucide-react";
import { PanInfo, motion } from "motion/react";
import { toast } from "sonner";
import { deleteProject } from "@/actions/projects";
import { Project } from "@/lib/types";
import { calculateTimeSince, cn } from "@/lib/utils";
import { EditProjectDialog } from "./EditProjectDialog";
import { StatusBadge } from "./StatusBadge";
import { DialogTrigger } from "./ui/Dialog";

export function DragListItem({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  async function handleDragEnd(_: TouchEvent, info: PanInfo) {
    const containerWidth = containerRef.current?.offsetWidth ?? 300;
    const deleteThreshold = -(containerWidth * 0.8);

    if (info.offset.x < deleteThreshold) {
      try {
        await deleteProject(project.id);
      } catch (e) {
        toast.error("Something went wrong. Your project could not be deleted.");
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex h-full gap-3 overflow-clip border-b border-border bg-border dark:border-popup dark:bg-popup",
        className,
      )}
    >
      <motion.div
        className="flex h-full w-fit -translate-x-20 touch-manipulation"
        drag="x"
        dragDirectionLock
        dragConstraints={containerRef}
        dragElastic={1}
        onDragEnd={handleDragEnd}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
      >
        <DragEditProjectDialog project={project} />
        <div className="flex min-w-screen items-center justify-between rounded-lg bg-background pt-2 pr-12 pb-4 pl-4 drop-shadow-sm">
          <Link
            href={`/projects/${project.id}`}
            className="grid w-fit gap-1 text-foreground"
          >
            <h3 className="text-lg font-medium">{project.name}</h3>
            <p className="text-sm text-muted-foreground">
              {calculateTimeSince(project.updatedAt)}
            </p>
          </Link>
          <StatusBadge status={project.status} />
        </div>
        <div className="flex aspect-square h-full items-center justify-center gap-2">
          <ArrowLeftToLine className="text-neutral-300 dark:text-neutral-800" />
          <Trash className="text-destructive" />
        </div>
      </motion.div>
    </div>
  );
}

function DragEditProjectDialog({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <EditProjectDialog project={project} open={open} setOpen={setOpen}>
      <DialogTrigger asChild>
        <button className="flex aspect-square h-full items-center justify-center">
          <SquarePen />
        </button>
      </DialogTrigger>
    </EditProjectDialog>
  );
}
