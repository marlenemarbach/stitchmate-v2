"use client";

import { memo, useState } from "react";

import { ChevronDown, ChevronUp } from "../ui/Icons";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

function ReminderSteps({
  ref,
}: {
  ref: React.RefObject<HTMLInputElement | null>;
}) {
  const [value, setValue] = useState<number | "">(2);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value === "") {
      setValue(event.currentTarget.value);
    } else setValue(event.currentTarget.valueAsNumber);
  }

  return (
    <div className="relative">
      <Label htmlFor="step" className="mr-1 sr-only">
        Reminder Interval
      </Label>
      <Input
        min={0}
        name="step"
        type="number"
        size="small"
        className="w-12 text-left"
        value={value}
        onChange={(e) => handleValueChange(e)}
        data-steps={value}
        ref={ref}
      />
      <span
        className="absolute right-0 top-0 flex flex-col pr-1 translate-y-1/16"
        aria-hidden="true"
      >
        <button
          aria-label="increase value"
          onClick={() => setValue((prev) => Number(prev) + 1)}
        >
          <ChevronUp className="size-3" strokeWidth={2} />
        </button>
        <button
          aria-label="increase value"
          onClick={() => setValue((prev) => Number(prev) - 1)}
        >
          <ChevronDown className="size-3" strokeWidth={2} />
        </button>
      </span>
    </div>
  );
}

export default memo(ReminderSteps);
