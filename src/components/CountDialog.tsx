import { useActionState, useState } from "react";
import { IterationCw } from "lucide-react";
import { updateProject } from "@/actions/projects";
import { ActionResponse } from "@/actions/types";
import { useCount } from "@/contexts/CountContext";
import { type ProjectWithSubCounter } from "@/lib/types";
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

export function CountDialog({
  project,
  open,
  setOpen,
}: {
  project: ProjectWithSubCounter;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { count } = useCount();

  // temporary solution, force the form to rerender to control input value
  const [formKey, setFormKey] = useState(project.count);

  const [formValue, setFormValue] = useState(count);

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (_, formData: FormData) => {
      try {
        const data = {
          count: Number(formData.get("count")),
        };

        const result = await updateProject(data, project.id);
        if (result.success) setOpen(false);

        return result;
      } catch (e) {
        console.error("Update project error:", e);
        return {
          success: false,
          message: "An error occured while updating your project",
          error: "Failed to update project",
        };
      }
    },
    initalState,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogClose />
        <DialogTitle>Rowcounter</DialogTitle>
        <DialogDescription>Set your current row count.</DialogDescription>
        <form key={formKey} className="mt-2" action={formAction}>
          <div className="grid gap-3">
            <label htmlFor="count" className="ml-2">
              Count
            </label>
            <div className="flex items-center gap-4">
              <NumberSpinner
                className="max-w-34"
                min={1}
                max={99}
                defaultValue={formValue}
                id="count"
                name="count"
                accessibleName="count"
                required
              />

              <Button
                type="button"
                variant="ghost"
                className="w-fit p-0 text-base text-muted-foreground hover:bg-transparent hover:text-foreground/80 focus-visible:text-foreground focus-visible:ring-transparent focus-visible:outline-none active:text-foreground dark:hover:bg-transparent"
                onClick={() => {
                  setFormKey(1);
                  setFormValue(1);
                }}
              >
                <IterationCw className="size-4" />
                set to 1
              </Button>
            </div>
          </div>

          {state.errors && <FormError>{state.message}</FormError>}
          <DialogFooter className="mt-6">
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
