import { PROJECT_STATUSES } from "@/lib/constants";
import { ProjectStatus } from "@/lib/types";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioIndicator,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { StatusBadge } from "./ui/StatusBadge";

export function ProjectStatusMenu({
  status,
  onStatusChange,
  isPending,
}: {
  status: ProjectStatus;
  onStatusChange: (status: ProjectStatus) => void;
  isPending?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.preventDefault()} asChild>
        <Button
          variant="ghost"
          className="my-auto -ml-1 h-5 w-5 p-0 hover:bg-transparent hover:text-foreground focus-visible:text-foreground sm:ml-0 dark:hover:bg-transparent"
        >
          {isPending ? (
            <StatusBadge status={status} className="animate-pulse" />
          ) : (
            <StatusBadge status={status} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={8}
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={(value) => onStatusChange(value as ProjectStatus)}
        >
          {PROJECT_STATUSES.map((el) => {
            return (
              <DropdownMenuRadioItem key={el} value={el}>
                <StatusBadge className="size-4" status={el} />
                {el}
                <DropdownMenuRadioIndicator />
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
