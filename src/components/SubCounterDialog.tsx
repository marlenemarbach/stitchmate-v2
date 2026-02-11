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
import { NumberSpinner } from "./ui/NumberSpinner";

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
  //  forces the form to rerender via key change, to keep input states internal
  const [formKey, setFormKey] = useState(1);

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (_, formData: FormData) => {
      try {
        const data = {
          startRow: Number(formData.get("startRow")),
          interval: Number(formData.get("interval")),
          active: formData.get("active") === "on",
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
        <form className="mt-2" key={formKey} action={formAction}>
          <div className="grid grid-cols-2">
            <div className="grid gap-3">
              <label htmlFor="startRow" className="ml-2">
                Start row:
              </label>
              <NumberSpinner
                className="max-w-34"
                min={1}
                max={99}
                defaultValue={project.subCounter.startRow}
                id="startRow"
                name="startRow"
                accessibleName="start row"
                required
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="interval" className="ml-2">
                Row interval:
              </label>
              <NumberSpinner
                className="max-w-34"
                min={1}
                max={99}
                defaultValue={project.subCounter.interval}
                id="interval"
                name="interval"
                accessibleName="row interval"
                required
              />
            </div>
            {state.errors && <FormError>{state.message}</FormError>}
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="ghost"
              className="w-fit p-0 text-base text-muted-foreground hover:bg-transparent hover:text-foreground/80 focus-visible:text-foreground focus-visible:ring-transparent focus-visible:outline-none active:text-foreground dark:hover:bg-transparent"
              onClick={() => setFormKey((prev) => prev + 1)}
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
