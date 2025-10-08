"use client";

import { useCounterStore } from "@/providers/CounterStoreProvider";
import { NeedleSelector } from "./_components/NeedleSelector";
import {
  ActiveReminder,
  ActiveReminderCount,
} from "./_components/ActiveReminder";
import { RowCounter } from "./_components/RowCounter";
import { Toolbar } from "./_components/ui/Toolbar";
import { CountDirectionToggle } from "./_components/CountDirectionToggle";
import { Divider } from "./_components/ui";
import { useRef } from "react";
import { ReminderGroup } from "./_components/ReminderGroup";
import { ReminderSteps } from "./_components/ReminderSteps";

export default function Home() {
  const {
    count,
    direction,
    reminder,
    updateCount,
    updateDirection,
    createReminder,
    deleteReminder,
  } = useCounterStore((state) => state);

  const inputRef = useRef<HTMLInputElement>(null);

  const isActiveReminder =
    reminder && (count - reminder.startRow) % reminder.steps === 0;

  function getReminderCount() {
    if (!reminder) return 0;
    return (count - reminder.startRow) / reminder.steps + 1;
  }

  const reminderSteps = Number(inputRef?.current?.dataset?.steps ?? 1);

  return (
    <main className="flex-1 grid grid-cols-2 grid-rows-[1fr_10fr_2fr]">
      <NeedleSelector />
      {isActiveReminder && (
        <ActiveReminder reminder={reminder} deleteReminder={deleteReminder}>
          <ActiveReminderCount reminderCount={getReminderCount()} />
        </ActiveReminder>
      )}
      <div className="col-span-2 place-content-center">
        <RowCounter count={count} updateCount={updateCount} />
      </div>
      <Toolbar
        className="col-span-2 justify-self-center"
        aria-label="row counter toolbar"
      >
        <CountDirectionToggle
          updateDirection={updateDirection}
          direction={direction}
        />
        <Divider />
        <ReminderGroup
          createReminder={createReminder}
          deleteReminder={deleteReminder}
          steps={reminderSteps}
          reminder={reminder}
        />
        <ReminderSteps deleteReminder={deleteReminder} ref={inputRef} />
      </Toolbar>
    </main>
  );
}
