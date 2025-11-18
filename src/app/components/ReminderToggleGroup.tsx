"use client";

import { useCounterStore } from "@/providers/CounterStoreProvider";
import { ReminderType } from "@/stores/counter-store";
import { useRef } from "react";

import { ToggleGroup, ToggleGroupItem } from "../ui/ToggleGroup";
import ReminderSteps from "./ReminderSteps";

export function ReminderToggleGroup() {
  const reminder = useCounterStore((state) => state.reminder);
  const createReminder = useCounterStore((state) => state.createReminder);
  const deleteReminder = useCounterStore((state) => state.deleteReminder);

  const inputRef = useRef<HTMLInputElement>(null);

  const reminderSteps = Number(inputRef?.current?.dataset?.steps ?? 2);

  function toggleReminder(reminderType: ReminderType) {
    if (reminderType === reminder?.type) {
      deleteReminder();
      return;
    }
    createReminder({ type: reminderType, steps: reminderSteps });
  }

  return (
    <>
      <ToggleGroup>
        <ToggleGroupItem
          aria-label="toggle short rows"
          isActive={reminder?.type === "Short Row"}
          onClick={() => toggleReminder("Short Row")}
        >
          <span aria-hidden>SH</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="toggle increase"
          isActive={reminder?.type === "Increase"}
          onClick={() => toggleReminder("Increase")}
        >
          <span aria-hidden>Inc</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="toggle decrease"
          isActive={reminder?.type === "Decrease"}
          onClick={() => toggleReminder("Decrease")}
        >
          <span aria-hidden>Dec</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <ReminderSteps ref={inputRef} />
    </>
  );
}
