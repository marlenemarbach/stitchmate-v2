import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Asterisk,
  TriangleRight,
} from "lucide-react";
import { MotionProps, motion } from "motion/react";
import { SubCounterType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RadioGroup } from "./ui/RadioGroup";

export function SubCounterTypeRadio({
  subCounterType = "increase",
}: {
  subCounterType?: SubCounterType;
}) {
  return (
    <RadioGroup className="flex items-start gap-3">
      <SubCounterRadioButton
        value="increase"
        name="type"
        className="border-green-200 group-data-[state=disabled]:!border-border group-data-[state=disabled]:!bg-transparent group-data-[state=disabled]:!text-foreground"
        defaultChecked={subCounterType === "increase"}
      >
        <ArrowUpWideNarrow />
        {/* Increase */}
      </SubCounterRadioButton>
      <SubCounterRadioButton
        name="type"
        value="decrease"
        className="group-data-[state=disabled]:!border-border group-data-[state=disabled]:!bg-transparent group-data-[state=disabled]:!text-foreground"
        defaultChecked={subCounterType === "decrease"}
      >
        <ArrowDownWideNarrow />
        {/* Decrease */}
      </SubCounterRadioButton>
      <SubCounterRadioButton
        name="type"
        value="shortRow"
        className="group-data-[state=disabled]:!border-border group-data-[state=disabled]:!bg-transparent group-data-[state=disabled]:!text-foreground"
        defaultChecked={subCounterType === "shortRow"}
      >
        <TriangleRight />
        {/* Short row */}
      </SubCounterRadioButton>
      <SubCounterRadioButton
        name="type"
        value="patternRepeat"
        className="group-data-[state=disabled]:!border-border group-data-[state=disabled]:!bg-transparent group-data-[state=disabled]:!text-foreground"
        defaultChecked={subCounterType === "patternRepeat"}
      >
        <Asterisk className="shrink-0" />
        <SubCounterRadioButtonLabel>Pattern rep.</SubCounterRadioButtonLabel>
      </SubCounterRadioButton>
    </RadioGroup>
  );
}

export function SubCounterRadioButton({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <>
      <input className="peer hidden appearance-none" type="radio" {...props} />
      <button
        type="button"
        role="radio"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        tabIndex={1}
      >
        {children}
      </button>
    </>
  );
}

function SubCounterRadioButtonLabel({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"label"> & MotionProps) {
  return (
    <motion.label
      initial={{ scale: 0 }}
      className={cn("", className)}
      {...props}
    >
      {children}
    </motion.label>
  );
}
