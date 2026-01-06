"use client";

import { startTransition, use, useOptimistic } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { CountDirection, ProjectWithSubCounter } from "@/lib/types";
import { useCounterStore } from "@/providers/CounterStoreProvider";
import { updateProject } from "../actions/projects";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";

export function CountDirectionToggle({
  project,
}: {
  project: Promise<ProjectWithSubCounter>;
}) {
  const currentProject = use(project);

  const direction = useCounterStore((state) => state.direction);
  const updateDirection = useCounterStore((state) => state.updateDirection);

  const [optimisticDirection, setOptimisticDirection] =
    useOptimistic(direction);

  async function handleUpdateDirection(newDirection: CountDirection) {
    startTransition(async () => {
      setOptimisticDirection(newDirection);
      try {
        const result = await updateProject(
          { direction: newDirection },
          currentProject.id,
        );
        if (!result.project) {
          toast.error("Count direction could not be updated", {
            description: "Direction has been reset.",
          });
          return;
        }

        updateDirection(result.project.direction);
      } catch (e) {
        toast.error("Count direction could not be updated", {
          description: "Direction has been reset.",
        });
        console.error("Failed to update direction");
      }
    });
  }

  return (
    <RadioGroup
      className="gap-0 rounded-full bg-neutral-800 p-1"
      defaultValue={currentProject.direction}
    >
      <RadioGroupItem
        className="size-8 rounded-full border-none"
        value={"up"}
        aria-pressed={optimisticDirection === "up"}
        onClick={() => handleUpdateDirection("up")}
      >
        <Plus className="size-4" />
      </RadioGroupItem>
      <RadioGroupItem
        className="size-8 rounded-full border-none"
        value={"down"}
        aria-pressed={optimisticDirection === "down"}
        onClick={() => handleUpdateDirection("down")}
      >
        <Minus className="size-4" />
      </RadioGroupItem>
    </RadioGroup>
  );
}
