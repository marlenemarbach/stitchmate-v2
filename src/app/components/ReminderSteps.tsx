"use client";

import { memo, useState } from "react";
import { Step } from "../ui/Icons";
import { Input } from "../ui/Input";

type ReminderStepsProps = {
  deleteReminder: () => void;
};

function ReminderSteps({
  deleteReminder,
  ...props
}: Omit<React.ComponentPropsWithRef<"input">, "size"> & ReminderStepsProps) {
  const [value, setValue] = useState(1);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.valueAsNumber);
    deleteReminder();
  }

  return (
    <div className="bg-midnight-500 p-1 rounded-sm flex items-center has-[:focus-visible]:focus">
      <Step className="rotate-90 size-5" />
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

export default memo(ReminderSteps);
