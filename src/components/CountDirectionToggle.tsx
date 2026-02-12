"use client";

import { startTransition } from "react";
import { Minus, Plus } from "lucide-react";
import { useCountDirection } from "@/contexts/CountDirectionContext";
import { updateProject } from "../actions/projects";
import { RadioSwitch, RadioSwitchItem } from "./ui/RadioSwitch";

export function CountDirectionToggle({ projectId }: { projectId: number }) {
  const [direction, toggleDirection] = useCountDirection();

  function handleUpdateDirection(newDirection: string) {
    const numDirection = newDirection === "up" ? 1 : -1;

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
    <RadioSwitch
      defaultValue={direction === 1 ? "up" : "down"}
      onValueChange={(value) => handleUpdateDirection(value)}
    >
      <RadioSwitchItem value="up">
        <Plus />
      </RadioSwitchItem>
      <RadioSwitchItem value="down">
        <Minus />
      </RadioSwitchItem>
    </RadioSwitch>
  );
}
