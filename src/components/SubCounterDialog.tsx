import { useActionState, useState } from "react";
import { IterationCw } from "lucide-react";
import { ActionResponse } from "@/actions/types";
import { type ProjectWithSubCounter } from "@/lib/types";
import { updateSubCounter } from "../actions/subCounter";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/Dialog";
import { FormError } from "./ui/Form";
import {
  SpinButton,
  SpinButtonDecrement,
  SpinButtonError,
  SpinButtonField,
  SpinButtonGroup,
  SpinButtonIncrement,
  SpinButtonLabel,
} from "./ui/SpinButton";

const initalState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export function SubCounterDialog({
  project,
  open,
  setOpen,
}: {
  project: ProjectWithSubCounter;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [interval, setInterval] = useState(
    project.subCounter.interval.toString(),
  );
  const [startRow, setStartRow] = useState(
    project.subCounter.startRow.toString(),
  );

  function handleReset() {
    setInterval("1");
    setStartRow(project.count.toString());
  }

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (_, formData: FormData) => {
      try {
        const data = {
          startRow: Number(formData.get("startRow")),
          interval: Number(formData.get("interval")),
          active: true,
        };
        const result = await updateSubCounter(project.id, data);

        if (result.success) setOpen(false);

        return result;
      } catch (e) {
        console.error("Update subcounter error:", e);
        return {
          success: false,
          message: "An error occured while updating your subcounter",
          error: "Failed to update subcounter",
        };
      }
    },
    initalState,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogClose />
        <DialogTitle>Subcounter</DialogTitle>
        <DialogDescription>
          Configure a subcounter to track repetive tasks along with your main
          counter.
        </DialogDescription>
        <form className="mt-2" action={formAction}>
          <div className="grid grid-cols-2">
            <div className="grid gap-3">
              <SpinButton
                value={startRow}
                onValueChange={setStartRow}
                id="startRow"
                min={1}
                max={99}
              >
                <SpinButtonLabel>Start row:</SpinButtonLabel>
                <SpinButtonGroup>
                  <SpinButtonDecrement title="decrement current count by 1" />
                  <SpinButtonField name="startRow" />
                  <SpinButtonIncrement title="increment current count by 1" />
                </SpinButtonGroup>
                <SpinButtonError />
              </SpinButton>
            </div>

            <div className="grid gap-3">
              <SpinButton
                id="interval"
                min={1}
                max={99}
                value={interval}
                onValueChange={setInterval}
              >
                <SpinButtonLabel>Row interval:</SpinButtonLabel>
                <SpinButtonGroup>
                  <SpinButtonDecrement title="decrement current count by 1" />
                  <SpinButtonField name="interval" />
                  <SpinButtonIncrement title="increment current count by 1" />
                </SpinButtonGroup>
                <SpinButtonError />
              </SpinButton>
            </div>
            {state.errors && <FormError>{state.message}</FormError>}
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="ghost"
              className="w-fit p-0 text-base text-muted-foreground hover:bg-transparent hover:text-foreground/80 focus-visible:text-foreground focus-visible:ring-transparent focus-visible:outline-none active:text-foreground dark:hover:bg-transparent"
              onClick={handleReset}
            >
              <IterationCw className="size-4" />
              reset
            </Button>
            <Button
              className="ml-auto w-[4.75rem]"
              onClick={() => setOpen(false)}
              variant="secondary"
              disabled={pending}
            >
              cancel
            </Button>
            <Button disabled={pending} type="submit" className="w-[4.75rem]">
              save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
