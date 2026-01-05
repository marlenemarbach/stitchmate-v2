"use client";

import { startTransition, use, useOptimistic } from "react";
import { Minus, Plus } from "lucide-react";
import { CountDirection, ProjectWithSubCounter } from "@/lib/types";
import { useCounterStore } from "@/providers/CounterStoreProvider";
import { updateProject } from "../actions/projects";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";

export function CountDirectionToggle({
  project,
}: {
  project: ProjectWithSubCounter;
}) {
  const currentProject = project;
  // const currentProject = use(project);

  const direction = useCounterStore((state) => state.direction);
  const updateDirection = useCounterStore((state) => state.updateDirection);

  const [optimisticDirection, setOptimisticDirection] =
    useOptimistic(direction);

  async function handleUpdateDirection(newDirection: CountDirection) {
    startTransition(async () => {
      setOptimisticDirection(newDirection);
      const result = await updateProject(
        { direction: newDirection },
        currentProject.id,
      );
      if (!result.project) {
        // add toast and error handling later
        console.error("Failed to update direction");
        return;
      }
      updateDirection(result.project.direction);
    });
  }

  return (
    <RadioGroup className="gap-0 border-r border-border">
      <RadioGroupItem
        value={"up"}
        aria-pressed={optimisticDirection === "up"}
        onClick={() => handleUpdateDirection("up")}
      >
        <Plus className="size-4" />
      </RadioGroupItem>
      <RadioGroupItem
        value={"up"}
        aria-pressed={optimisticDirection === "down"}
        onClick={() => handleUpdateDirection("down")}
      >
        <Minus className="size-4" />
      </RadioGroupItem>
    </RadioGroup>
  );
}
