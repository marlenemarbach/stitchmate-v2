"use client";

import { memo, useState } from "react";
import { Step } from "../ui/Icons";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

function ReminderSteps({
  ...props
}: Omit<React.ComponentPropsWithRef<"input">, "size">) {
  const [value, setValue] = useState<number | "">(2);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value === "") {
      setValue(event.currentTarget.value);
    } else setValue(event.currentTarget.valueAsNumber);
  }

  return (
    <div className="flex items-center gap-1">
      <Step className="size-4 rotate-90" />
      <Label htmlFor="step" className="mr-1">
        Step
      </Label>
      <Input
        min={0}
        name="step"
        type="number"
        size="small"
        className="w-10 text-center"
        value={value}
        onChange={(e) => handleValueChange(e)}
        data-steps={value}
        {...props}
      />
    </div>
  );
}

export default memo(ReminderSteps);
