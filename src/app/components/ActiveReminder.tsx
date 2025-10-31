"use client";

import { Increase, Decrease, ShortRows, XCircle } from "../ui/Icons";
import { Button } from "../ui/Button";
import { useCounterStore } from "@/providers/CounterStoreProvider";
import { Reminder } from "../contexts/CounterContext";
import { useShallow } from "zustand/shallow";

const reminderIcons = {
  Increase,
  Decrease,
  ShortRows,
} as const;

export function ActiveReminder({ children }: React.PropsWithChildren) {
  const reminder = useCounterStore((state) => state.reminder);
  const deleteReminder = useCounterStore((state) => state.deleteReminder);
  const isActiveReminder = useCounterStore(
    useShallow((state) => checkForActiveReminder(state.reminder, state.count)),
  );
  if (!reminder || !isActiveReminder) return;

  const Icon = reminderIcons[reminder.type];
  return (
    <div className="flex items-center gap-3 place-content-end">
      {children}
      <Button
        variant="primary"
        className="w-10 h-10 relative justify-self-end"
        onClick={() => deleteReminder()}
      >
        <XCircle className="absolute size-4 -top-2 left-8 translate-y-1/4 -translate-x-1/4" />
        <Icon />
      </Button>
    </div>
  );
}

export function ActiveReminderCount() {
  const reminderCount = useCounterStore(
    useShallow((state) => getReminderCount(state.reminder, state.count)),
  );

  return <span>{reminderCount}</span>;
}

function checkForActiveReminder(reminder: Reminder | null, count: number) {
  if (!reminder) return false;
  return reminder && (count - reminder.startRow) % reminder.steps === 0;
}

function getReminderCount(reminder: Reminder | null, count: number) {
  if (!reminder) return 0;
  return (count - reminder.startRow) / reminder.steps + 1;
}
