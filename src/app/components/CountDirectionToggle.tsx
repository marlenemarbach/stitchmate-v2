"use client";

import { CountDirection } from "@/stores/counter-store";
import { Minus, Plus } from "../ui/Icons";
import { ToggleButton, ToggleGroup } from "../ui/ToggleGroup";
import { useCounterStore } from "@/providers/CounterStoreProvider";

export function CountDirectionToggle({}) {
  const direction = useCounterStore((state) => state.direction);
  const updateDirection = useCounterStore((state) => state.updateDirection);

  function handleUpdateDirection(newDirection: CountDirection) {
    if (newDirection === direction) return;
    updateDirection(newDirection);
  }

  return (
    <ToggleGroup className="bg-midnight-500 h-9 p-1">
      <ToggleButton
        isActive={direction === "up"}
        onClick={() => handleUpdateDirection("up")}
      >
        <Plus className="size-4" />
      </ToggleButton>
      <ToggleButton
        isActive={direction === "down"}
        onClick={() => handleUpdateDirection("down")}
      >
        <Minus className="size-4" />
      </ToggleButton>
    </ToggleGroup>
  );
}
