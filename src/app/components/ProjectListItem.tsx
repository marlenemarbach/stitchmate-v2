import Link from "next/link";
import { ArrowUpRight, BadgeCheck, EllipsisVertical } from "lucide-react";
import { type Project } from "@/lib/types";
import {
  EditProjectDialog,
  EditProjectDialogTrigger,
} from "./EditProjectDialog";
import { Button } from "./ui/Button";

type ProjectProps = {
  project: Project;
};

export function ProjectListItem({ project }: ProjectProps) {
  return (
    <div>
      <div className="flex items-center pb-4 transition-opacity duration-300 ease-out group-hover/list:opacity-50 hover:opacity-100">
        <Link href={`/projects/${project.id}`} className="flex-1">
          <h3>{project.name}</h3>
          <div className="mt-1 flex items-center gap-1">
            {project.status === "wip" ? (
              <ArrowUpRight className="size-4 text-amber-100" />
            ) : (
              <BadgeCheck className="size-4 text-emerald-200" />
            )}
            <p className="text-sm text-muted-foreground">
              knit {calculateTimeSince(project.updatedAt)}
            </p>
          </div>
        </Link>
        {/* <EditProjectDialog project={project}> */}
        {/*   <EditProjectDialogTrigger> */}
        {/*     <Button variant="ghost" size="icon" aria-label="edit project"> */}
        {/*       <EllipsisVertical /> */}
        {/*     </Button> */}
        {/*   </EditProjectDialogTrigger> */}
        {/* </EditProjectDialog> */}
      </div>
      <div className="h-1 w-full border-t border-border/70"></div>
    </div>
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
