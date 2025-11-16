"use client";

import { Increase, Decrease, ShortRows } from "../ui/Icons";
import { Button } from "../ui/Button";
import { useCounterStore } from "@/providers/CounterStoreProvider";
import { useShallow } from "zustand/shallow";
import { type Reminder as ReminderType } from "@/stores/counter-store";
import { Modal, DialogContainer, DialogTrigger } from "../ui/Modal";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/* ----------------------------------------------------------------------------------
 * Reminder
 * ----------------------------------------------------------------------------------*/

const reminderIcons = {
  Increase,
  Decrease,
  ShortRows,
} as const;

export function Reminder() {
  const reminder = useCounterStore((state) => state.reminder);
  const deleteReminder = useCounterStore((state) => state.deleteReminder);
  const isActiveReminder = useCounterStore(
    useShallow((state) => getActiveReminder(state.reminder, state.count)),
  );
  const [modalOpen, setModalOpen] = useState(false);

  const Icon = reminder ? reminderIcons[reminder.type] : Increase;

  function handleDeleteReminder() {
    setModalOpen(false);
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
          <ReminderCount />
          <Modal open={modalOpen} setOpen={setModalOpen}>
            <DialogTrigger asChild>
              <Button
                data-state-active={isActiveReminder}
                variant="primary"
                className="w-9 justify-self-end p-0"
              >
                <Icon />
              </Button>
            </DialogTrigger>
            <DialogContainer className="bg-none p-0">
              <Button onClick={handleDeleteReminder}>delete reminder</Button>
            </DialogContainer>
          </Modal>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
/* -------------------------------------------------------------------------------------------------
 * Reminder count
 * -----------------------------------------------------------------------------------------------*/

export function ReminderCount() {
  const reminderCount = useCounterStore(
    useShallow((state) => getReminderCount(state.reminder, state.count)),
  );

  return <span>{reminderCount}</span>;
}

/* ------------------------------------------------------------------------------------------------ */

function getActiveReminder(reminder: ReminderType | null, count: number) {
  if (!reminder) return false;
  return reminder && (count - reminder.startRow) % reminder.steps === 0;
}

function getReminderCount(reminder: ReminderType | null, count: number) {
  if (!reminder) return 0;
  return (count - reminder.startRow) / reminder.steps + 1;
}
