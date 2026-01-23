import { CircleCheck, CircleDotDashed } from "lucide-react";
import { ProjectStatus } from "@/lib/types";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="flex items-center">
      {status === "wip" ? (
        <CircleDotDashed className="size-4 text-orange-200" />
      ) : (
        <CircleCheck className="size-4 text-green-200" />
      )}
    </span>
  );
}
