"use client";

import { startTransition, use } from "react";
import { Minus, Plus } from "lucide-react";
import { CountDirectionContext } from "@/contexts/CountDirectionContext";
import { CountDirection } from "@/lib/types";
import { updateProject } from "../actions/projects";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";

export function CountDirectionToggle({ projectId }: { projectId: number }) {
  const directionContext = use(CountDirectionContext);

  if (!directionContext)
    throw new Error(
      "CountDirectionToggle must be used within CountDirectionContext",
    );

  const { direction, updateDirection } = directionContext;

  function handleUpdateDirection(newDirection: CountDirection) {
    if (newDirection === direction) return;
    // optimistic update via client side context. In this case we don't want to revert to the previous value if the operation fails.
    updateDirection(newDirection);

    startTransition(async () => {
      try {
        console.log("transition params", direction, projectId);
        await updateProject({ direction: newDirection }, projectId);
      } catch (e) {
        // ignore this error since it's not critical if the newDirection isn't actually saved
        console.error("UpdateProject error:", e);
      }
    });
  }

  return (
    <RadioGroup
      className="gap-0 rounded-full bg-neutral-800 p-1"
      defaultValue={direction}
    >
      <RadioGroupItem
        className="size-8 rounded-full border-none"
        value={"up"}
        aria-pressed={direction === "up"}
        onClick={() => handleUpdateDirection("up")}
      >
        <Plus className="size-4" />
      </RadioGroupItem>
      <RadioGroupItem
        className="size-8 rounded-full border-none"
        value={"down"}
        aria-pressed={direction === "down"}
        onClick={() => handleUpdateDirection("down")}
      >
        <Minus className="size-4" />
      </RadioGroupItem>
    </RadioGroup>
  );
}
