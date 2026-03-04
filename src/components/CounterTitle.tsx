import { ChevronRight } from "lucide-react";
import { Link } from "./ui/Link";

export function CounterTitle({ projectName }: { projectName?: string }) {
  return (
    <div className="flex gap-1 p-4">
      <Link href="/projects" className="flex items-center gap-1">
        Projects <ChevronRight className="size-3 stroke-2" />
      </Link>
      <span className="font-medium">{projectName}</span>
    </div>
  );
}
