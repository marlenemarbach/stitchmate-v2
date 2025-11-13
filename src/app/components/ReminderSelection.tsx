"use client";

import { useCounterStore } from "@/providers/CounterStoreProvider";
import { useRef } from "react";
import { ChevronDown, Decrease, Increase, ShortRows } from "../ui/Icons";
import { ReminderType } from "@/stores/counter-store";
import { RadioGroup } from "../ui/RadioGroup";
import { RadioButton } from "../ui/RadioButton";
import { Menu, MenuContent, MenuTrigger } from "../ui/Menu";
import ReminderSteps from "./ReminderSteps";

export function ReminderSelection() {
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
    <RadioGroup>
      <RadioButton
        aria-label="start short rows"
        isActive={reminder?.type === "ShortRows"}
        onClick={() => handleReminder("ShortRows")}
      >
        <ShortRows />
      </RadioButton>
      <div className="flex">
        <RadioButton
          aria-label="start increase"
          isActive={reminder?.type === "Increase"}
          onClick={() => handleReminder("Increase")}
        >
          <Increase />
        </RadioButton>
        <Menu position="topRight" delay={100}>
          <MenuTrigger
            variant="ghost"
            className="px-1 hover:bg-white/10 data-[active=true]:bg-white/10"
          >
            <ChevronDown className="size-3" strokeWidth={2} />
          </MenuTrigger>
          <MenuContent>
            <ReminderSteps />
          </MenuContent>
        </Menu>
      </div>
      <div className="flex">
        <RadioButton
          aria-label="start decrease"
          isActive={reminder?.type === "Decrease"}
          onClick={() => handleReminder("Decrease")}
        >
          <Decrease />
        </RadioButton>
        <Menu position="topRight" delay={100}>
          <MenuTrigger
            variant="ghost"
            className="px-1 hover:bg-white/10 data-[active=true]:bg-white/10"
          >
            <ChevronDown className="size-3" strokeWidth={2} />
          </MenuTrigger>
          <MenuContent>
            <ReminderSteps />
          </MenuContent>
        </Menu>
      </div>
    </RadioGroup>
  );
}
