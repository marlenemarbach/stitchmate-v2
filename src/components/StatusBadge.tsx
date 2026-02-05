import { CircleCheck, CircleDotDashed } from "lucide-react";
import { ProjectStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span className="flex items-center">
      {status === "wip" ? (
        <CircleDotDashed
          className={cn(
            "size-5 text-orange-500 sm:size-5 dark:text-orange-200",
            className,
          )}
        />
      ) : (
        <CircleCheck
          className={cn(
            "size-5 text-green-500 sm:size-5 dark:text-green-200",
            className,
          )}
        />
      )}
    </span>
  );
}
