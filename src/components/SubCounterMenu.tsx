"use client";

import { startTransition } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  IterationCw,
} from "lucide-react";
import { toast } from "sonner";
import { useSubCounter } from "@/contexts/SubCounterContext";
import { SubCounter } from "@/lib/types";
import { type ProjectWithSubCounter } from "@/lib/types";
import { updateSubCounter } from "../actions/subCounter";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import {
  NumberSpinner,
  NumberSpinnerButton,
  NumberSpinnerInput,
} from "./ui/NumberSpinner";
import { Switch } from "./ui/Switch";

// TODO:
// - provide visual feedback on the subcounter errors and pending state
// - debounce number input

export function SubCounterMenu({
  project,
}: {
  project: ProjectWithSubCounter;
}) {
  const { setState } = useSubCounter();

  function handleSubCounterChange(data: Partial<SubCounter>) {
    try {
      startTransition(async () => {
        await updateSubCounter(project.id, data);
      });
      if (data.active != undefined) setState("on");
    } catch (error) {
      console.error("Update subcounter error:", error);
      toast.error("Subcounter could not be updated");
    }
  }

  return (
    <div className="grid gap-6">
      <h2 className="mt-1 text-center text-lg font-medium">Subcounter</h2>
      <form className="grid grid-cols-2 grid-rows-3 gap-y-1">
        <p className="col-span-2 mt-1 ml-2 h-fit self-start text-sm text-muted-foreground">
          Select start row and row interval:
        </p>
        <div className="col-span-2 flex items-center gap-2 rounded-lg bg-primary/5 pr-4 pl-6">
          <label htmlFor="startRow">from:</label>
          <NumberSpinner
            min={1}
            max={99}
            defaultValue={5}
            className="bg-transparent"
          >
            <NumberSpinnerInput id={"startRow"} />
            <div className="grid">
              <NumberSpinnerButton direction={1} title="Increment start row">
                <ChevronUp strokeWidth={3} />
              </NumberSpinnerButton>
              <NumberSpinnerButton direction={-1} title="Decrement start row">
                <ChevronDown strokeWidth={3} />
              </NumberSpinnerButton>
            </div>
          </NumberSpinner>

          <label className="ml-auto" htmlFor="interval">
            every:
          </label>
          <NumberSpinner min={1} max={99} defaultValue={5}>
            <NumberSpinnerInput id={"interval"} />
            <div className="grid">
              <NumberSpinnerButton direction={1} title="Increment row interval">
                <ChevronUp strokeWidth={3} />
              </NumberSpinnerButton>
              <NumberSpinnerButton
                direction={-1}
                title="Decrement row interval"
              >
                <ChevronDown strokeWidth={3} />
              </NumberSpinnerButton>
            </div>
          </NumberSpinner>
        </div>
        <Button
          variant="ghost"
          type="button"
          size="small"
          className="w-fit self-center rounded-lg p-1 pr-2 text-muted-foreground"
        >
          <IterationCw className="size-4" />
          reset
        </Button>

        <Button
          type="button"
          size="small"
          variant="ghost"
          className="self-center justify-self-end rounded-lg pr-2 pl-1"
        >
          <ArrowUpRight className="size-4" />
          save
        </Button>
      </form>
      <Label
        htmlFor="notification"
        className="flex w-full items-center justify-end gap-3 text-base"
      >
        <div className="flex items-center gap-2">
          <span>Show Subcounter</span>
        </div>
        <Switch
          id="notification"
          name="notification"
          defaultChecked={project.subCounter.active}
          onCheckedChange={(isChecked) =>
            handleSubCounterChange({ active: isChecked })
          }
        ></Switch>
      </Label>
    </div>
  );
}
