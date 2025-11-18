"use client";

import { useCounterStore } from "@/providers/CounterStoreProvider";
import { type Reminder as ReminderType } from "@/stores/counter-store";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

import { Button } from "../ui/Button";
import { Dialog, DialogContainer, DialogTrigger } from "../ui/Dialog";

/* ---------------------------------------------------------------------------------
 * Reminder
 * --------------------------------------------------------------------------------*/

export function Reminder() {
  const reminder = useCounterStore((state) => state.reminder);
  const deleteReminder = useCounterStore((state) => state.deleteReminder);
  const isActiveReminder = useCounterStore(
    useShallow((state) => getActiveReminder(state.reminder, state.count)),
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleDeleteReminder() {
    setDialogOpen(false);
    setTimeout(() => deleteReminder(), 600);
  }

  return (
    <AnimatePresence>
      {reminder && (
        <motion.div
          className="flex place-content-end items-center gap-3"
          key="reminder"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{
            type: "spring",
            bounce: 0.2,
            mass: 0.2,
            stiffness: 100,
            visualDuration: 0.25,
          }}
        >
          <Dialog open={dialogOpen} setOpen={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                data-state={isActiveReminder ? "on" : "off"}
                className="data-[state=on]:border-foreground bg-card dark:border border-border px-2 py-1 rounded-md"
              >
                {reminder.type}
                <ReminderCount />
              </button>
            </DialogTrigger>
            <DialogContainer className="bg-none p-0">
              <Button onClick={handleDeleteReminder}>delete reminder</Button>
            </DialogContainer>
          </Dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
/* -------------------------------------------------------------------------------
 * Reminder count
 * ------------------------------------------------------------------------------*/

export function ReminderCount() {
  const reminderCount = useCounterStore(
    useShallow((state) => getReminderCount(state.reminder, state.count)),
  );

  return <span> no. {reminderCount}</span>;
}

/* ---------------------------------------------------------------------------- */

export function getActiveReminder(
  reminder: ReminderType | null,
  count: number,
) {
  if (!reminder) return false;
  return reminder && (count - reminder.startRow) % reminder.steps === 0;
}

export function getReminderCount(reminder: ReminderType | null, count: number) {
  if (!reminder) return 0;
  return Math.floor((count - reminder.startRow) / reminder.steps + 1);
}
