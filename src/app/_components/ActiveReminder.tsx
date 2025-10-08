import { Increase, Decrease, ShortRows } from "./icons";
import { Button } from "./ui";
import { XCircle } from "./icons/Icons";
import { Reminder } from "@/stores/counter-store";

const reminderIcons = {
  Increase,
  Decrease,
  ShortRows,
} as const;

type ActiveReminderProps = {
  reminder: Reminder;
  deleteReminder: () => void;
};

export function ActiveReminder({
  reminder,
  deleteReminder,
  children,
}: React.PropsWithChildren & ActiveReminderProps) {
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

export function ActiveReminderCount({
  reminderCount,
}: {
  reminderCount: number;
}) {
  return <span>{reminderCount}</span>;
}
