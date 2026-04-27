import { ProjectStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StatusCompleted } from "../svg/StatusCompleted";
import { StatusFrogged } from "../svg/StatusFrogged";
import { StatusPlanned } from "../svg/StatusPlanned";
import { StatusWip } from "../svg/StatusWip";

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center", className)}>
      {status === "wip" && <StatusWip />}
      {status === "completed" && <StatusCompleted />}
      {status === "frogged" && <StatusFrogged />}
      {status === "planned" && <StatusPlanned />}
    </span>
  );
}
