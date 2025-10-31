import { Decrease, Increase, ShortRows } from "../ui/Icons";
import {
  type CreateReminderAction,
  Reminder,
  ReminderType,
} from "@/stores/counter-store";
import { RadioGroup } from "../ui/RadioGroup";
import { RadioButton } from "../ui/RadioButton";

type ReminderGroupProps = {
  reminder: Reminder | null;
  createReminder: CreateReminderAction;
  deleteReminder: () => void;
  steps: number;
};

export function ReminderGroup({
  reminder,
  createReminder,
  deleteReminder,
  steps,
}: React.PropsWithChildren & ReminderGroupProps) {
  function handleReminder(reminderType: ReminderType) {
    if (reminderType === reminder?.type) {
      deleteReminder();
      return;
    }
    createReminder({ type: reminderType, steps });
  }

  return (
    <>
      <RadioGroup>
        <RadioButton
          aria-label="start short rows"
          isActive={reminder?.type === "ShortRows"}
          onClick={() => handleReminder("ShortRows")}
        >
          <ShortRows />
        </RadioButton>
        <RadioButton
          aria-label="start increase"
          isActive={reminder?.type === "Increase"}
          onClick={() => handleReminder("Increase")}
        >
          <Increase />
        </RadioButton>
        <RadioButton
          aria-label="start decrease"
          isActive={reminder?.type === "Decrease"}
          onClick={() => handleReminder("Decrease")}
        >
          <Decrease />
        </RadioButton>
      </RadioGroup>
    </>
  );
}
