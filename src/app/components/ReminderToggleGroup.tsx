"use client";

import { useCounterStore } from "@/providers/CounterStoreProvider";
import { useRef } from "react";
import { ReminderType } from "@/stores/counter-store";
import { ToggleGroupButton, ToggleGroup } from "../ui/ToggleGroup";
import ReminderSteps from "./ReminderSteps";

export function ReminderToggleGroup() {
  const reminder = useCounterStore((state) => state.reminder);
  const createReminder = useCounterStore((state) => state.createReminder);
  const deleteReminder = useCounterStore((state) => state.deleteReminder);

  const inputRef = useRef<HTMLInputElement>(null);

  const reminderSteps = Number(inputRef?.current?.dataset?.steps ?? 1);

  function handleReminder(reminderType: ReminderType) {
    if (reminderType === reminder?.type) {
      deleteReminder();
      return;
    }
    createReminder({ type: reminderType, steps: reminderSteps });
  }

  return (
    <ToggleGroup>
      <ToggleGroupButton
        aria-label="start short rows"
        isActive={reminder?.type === "ShortRows"}
        onClick={() => handleReminder("ShortRows")}
      >
        <span aria-hidden>SH</span>
      </ToggleGroupButton>
      <ToggleGroupButton
        aria-label="start increase"
        isActive={reminder?.type === "Increase"}
        onClick={() => handleReminder("Increase")}
      >
        <span aria-hidden>Inc</span>
      </ToggleGroupButton>
      <ToggleGroupButton
        aria-label="start decrease"
        isActive={reminder?.type === "Decrease"}
        onClick={() => handleReminder("Decrease")}
      >
        <span aria-hidden>Dec</span>
      </ToggleGroupButton>
    </ToggleGroup>
  );
}
