import { PROJECT_STATUSES } from "@/lib/constants";
import { ProjectStatus } from "@/lib/types";
import { RadioGroup, RadioItem } from "./ui/RadioGroup";
import { StatusBadge } from "./ui/StatusBadge";

export function StatusRadioGroup({
  defaultValue,
}: {
  defaultValue: ProjectStatus;
}) {
  return (
    <>
      <label htmlFor="project-status" className="text-sm font-medium">
        Status:
      </label>
      <RadioGroup
        id="project-status"
        defaultValue={defaultValue}
        className="mb-4 -ml-4 flex w-full max-w-[calc(100dvw-1.5rem)] items-center gap-2 overflow-y-auto p-2 sm:mb-0"
        name="status"
      >
        {PROJECT_STATUSES.map((status) => {
          return (
            <RadioItem key={status} value={status} className="pl-2">
              <StatusBadge status={status} />
              {status}
            </RadioItem>
          );
        })}
      </RadioGroup>
    </>
  );
}
