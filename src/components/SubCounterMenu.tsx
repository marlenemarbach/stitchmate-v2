import { useActionState, useState } from "react";
import { IterationCw } from "lucide-react";
import { ActionResponse } from "@/actions/types";
import { type ProjectWithSubCounter } from "@/lib/types";
import { updateSubCounter } from "../actions/subCounter";
import { Button } from "./ui/Button";
import { FormError } from "./ui/Form";
import { NumberSpinner } from "./ui/NumberSpinner";
import { Switch } from "./ui/Switch";
import { ToolbarMenuDescription, ToolbarMenuTitle } from "./ui/ToolbarMenu";

const initalState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export function SubCounterMenu({
  project,
  setShowMenu,
}: {
  project: ProjectWithSubCounter;
  setShowMenu: (showMenu: boolean) => void;
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

        if (result.success) setShowMenu(false);

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
    <form className="grid gap-6" key={formKey} action={formAction}>
      <div className="mb-1 flex items-baseline justify-between">
        <ToolbarMenuTitle className="text-lg font-medium">
          Subcounter
        </ToolbarMenuTitle>
        <ToolbarMenuDescription>
          Set up a subcounter by selecting a starting row and an interval. The
          subcounter automatically tracks its repeats based on your settings.
        </ToolbarMenuDescription>
        <Switch
          aria-label="Subcounter notification"
          id="active"
          name="active"
          defaultChecked={project.subCounter.active}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <div className="grid gap-2">
          <label htmlFor="startRow" className="ml-1">
            Start row:
          </label>
          <NumberSpinner
            min={1}
            max={99}
            defaultValue={project.subCounter.startRow}
            id="startRow"
            name="startRow"
            accessibleName="start row"
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="interval" className="ml-1">
            Row interval:
          </label>
          <NumberSpinner
            min={1}
            max={99}
            defaultValue={project.subCounter.interval}
            id="interval"
            name="interval"
            accessibleName="row interval"
            required
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          className="mt-2 w-fit p-0 text-base text-muted-foreground hover:bg-transparent hover:text-foreground/80 focus-visible:text-foreground focus-visible:ring-transparent focus-visible:outline-none active:text-foreground dark:hover:bg-transparent"
          onClick={() => setFormKey((prev) => prev + 1)}
        >
          <IterationCw className="size-4" />
          reset
        </Button>

        <Button
          disabled={pending}
          type="submit"
          variant="ghost"
          className="mt-2 justify-self-end p-0 text-base text-blue-400 hover:bg-transparent hover:text-blue-400/80 focus-visible:text-blue-300 focus-visible:ring-transparent focus-visible:outline-none disabled:opacity-100 dark:text-blue-300 dark:hover:bg-transparent"
        >
          save changes
        </Button>
      </div>
      {state.errors && <FormError>{state.message}</FormError>}
    </form>
  );
}
