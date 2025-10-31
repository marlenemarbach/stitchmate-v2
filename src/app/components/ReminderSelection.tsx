"use client";

import { useCounterStore } from "@/providers/CounterStoreProvider";
import ReminderSteps from "./ReminderSteps";
import { ReminderGroup } from "./ReminderGroup";
import { useRef } from "react";

export function ReminderSelection() {
  const reminder = useCounterStore((state) => state.reminder);
  const createReminder = useCounterStore((state) => state.createReminder);
  const deleteReminder = useCounterStore((state) => state.deleteReminder);

  const inputRef = useRef<HTMLInputElement>(null);

  const reminderSteps = Number(inputRef?.current?.dataset?.steps ?? 1);

  return (
    <>
      <ReminderGroup
        createReminder={createReminder}
        deleteReminder={deleteReminder}
        steps={reminderSteps}
        reminder={reminder}
      />

      <ReminderSteps deleteReminder={deleteReminder} ref={inputRef} />
    </>
  );
}
