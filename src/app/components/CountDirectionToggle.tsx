"use client";

import { CountDirection } from "@/stores/counter-store";
import { Minus, Plus } from "../ui/Icons";
import { RadioButton } from "../ui/RadioButton";
import { RadioGroup } from "../ui/RadioGroup";
import { useCounterStore } from "@/providers/CounterStoreProvider";

export function CountDirectionToggle({}) {
  const direction = useCounterStore((state) => state.direction);
  const updateDirection = useCounterStore((state) => state.updateDirection);

  function handleUpdateDirection(newDirection: CountDirection) {
    if (newDirection === direction) return;
    updateDirection(newDirection);
  }

  return (
    <RadioGroup className="h-9 bg-midnight-500 p-1">
      <RadioButton
        variant="primary"
        size="small"
        isActive={direction === "up"}
        onClick={() => handleUpdateDirection("up")}
      >
        <Plus className="size-4" />
      </RadioButton>
      <RadioButton
        variant="primary"
        size="small"
        isActive={direction === "down"}
        onClick={() => handleUpdateDirection("down")}
      >
        <Minus className="size-4" />
      </RadioButton>
    </RadioGroup>
  );
}
