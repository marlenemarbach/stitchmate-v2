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
        type="single"
        defaultValue={direction === 1 ? "up" : "down"}
        onValueChange={(value) => handleUpdateDirection(value)}
        aria-label="Counting direction"
      >
        <ToolbarToggleItem
          data-state={direction === 1 ? "active" : "inactive"}
          value="up"
          aria-label="Up"
        >
          <Plus className="size-4" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          data-state={direction === -1 ? "active" : "inactive"}
          value="down"
          aria-label="Down"
        >
          <Minus className="size-4" />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
    </>
  );
}
