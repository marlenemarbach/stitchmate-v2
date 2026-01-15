"use client";

import { startTransition } from "react";
import { Minus, Plus } from "lucide-react";
import { ToolbarToggleGroup, ToolbarToggleItem } from "@/components/ui/Toolbar";
import { useCountDirection } from "@/contexts/CountDirectionContext";
import { updateProject } from "../actions/projects";

export function CountDirectionToggle({ projectId }: { projectId: number }) {
  const [direction, toggleDirection] = useCountDirection();

  function handleUpdateDirection(newDirection: string) {
    const numDirection = newDirection === "up" ? 1 : -1;
    if (direction === numDirection) return;

    // optimistic update via context. In this case we don't want to revert to the previous value if the operation fails.
    toggleDirection();

    startTransition(async () => {
      try {
        await updateProject({ direction: numDirection }, projectId);
      } catch (e) {
        // ignore this error since it's not critical if the newDirection isn't actually saved
        console.error("UpdateProject error:", e);
      }
    });
  }

  return (
    <>
      <ToolbarToggleGroup
        className="relative items-center gap-0 rounded-full bg-neutral-800 px-1"
        type="single"
        defaultValue={direction === 1 ? "up" : "down"}
        onValueChange={(value) => handleUpdateDirection(value)}
        aria-label="Counting direction setting"
      >
        <ToolbarToggleItem
          className="hover-instant size-8 rounded-full border-none hover:bg-primary/5"
          value="up"
          aria-label="Up"
        >
          <Plus className="size-4" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          className="hover-instant size-8 rounded-full border-none hover:bg-primary/5"
          value="down"
          aria-label="Down"
        >
          <Minus className="size-4" />
        </ToolbarToggleItem>
        <ClipPathContainer data-direction={direction === 1 ? "up" : "down"} />
      </ToolbarToggleGroup>
    </>
  );
}

function ClipPathContainer({
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-10 flex w-full items-center overflow-hidden bg-primary px-1 text-primary-foreground transition-[clip-path] duration-150 ease-out data-[direction=down]:[clip-path:_circle(1rem_at_calc(100%-1.25rem)_50%)] data-[direction=up]:[clip-path:_circle(1rem_at_1.25rem_50%)]"
      {...props}
    >
      <span className="flex size-8 items-center justify-center">
        <Plus className="size-4" />
      </span>
      <span className="flex size-8 items-center justify-center">
        <Minus className="size-4" />
      </span>
    </div>
  );
}
