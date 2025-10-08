import { useState } from "react";
import { Step } from "../icons";
import { Input } from "../ui";

type ReminderStepsProps = {
  deleteReminder: () => void;
};

export function ReminderSteps({
  deleteReminder,
  ...props
}: Omit<React.ComponentPropsWithRef<"input">, "size"> & ReminderStepsProps) {
  const [value, setValue] = useState(1);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.valueAsNumber);
    deleteReminder();
  }

  return (
    <div className="bg-midnight-500 p-1 pl-2 rounded-sm flex items-center gap-1 has-[:focus-visible]:focus">
      <Step />
      <Input
        type="number"
        size="small"
        className="w-6 text-center focus-visible:focus-none"
        value={value}
        onChange={(e) => handleChange(e)}
        data-steps={value}
        {...props}
      />
    </div>
  );
}
