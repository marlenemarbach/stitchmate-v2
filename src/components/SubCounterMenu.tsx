"use client";

import { useActionState, useState } from "react";
import { IterationCw } from "lucide-react";
import { ActionResponse } from "@/actions/types";
import { type ProjectWithSubCounter } from "@/lib/types";
import { updateSubCounter } from "../actions/subCounter";
import { Button } from "./ui/Button";
import { FormError } from "./ui/Form";
import { NumberSpinner } from "./ui/NumberSpinner";
import { Switch } from "./ui/Switch";

const initalState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export function SubCounterMenu({
  project,
}: {
  project: ProjectWithSubCounter;
}) {
  //  forces the form to rerender via key change, to keep input states internal
  const [formKey, setFormKey] = useState(1);

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (prev: ActionResponse, formData: FormData) => {
      try {
        const data = {
          startRow: Number(formData.get("startRow")),
          interval: Number(formData.get("interval")),
          active: formData.get("active") === "on",
        };
        console.log("data", data, formData.get("startRow"));
        const result = await updateSubCounter(project.id, data);
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
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-lg font-medium">Subcounter</h2>
        <Switch
          aria-label="Subcounter notification"
          id="active"
          name="active"
          defaultChecked={project.subCounter.active}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <label className="text-sm" htmlFor="startRow">
          Start row:
        </label>

        <label className="text-sm" htmlFor="interval">
          Row interval:
        </label>

        <NumberSpinner
          min={1}
          max={99}
          defaultValue={project.count}
          id="startRow"
          name="startRow"
          accessibleName="start row"
          required
        />

        <NumberSpinner
          min={1}
          max={99}
          defaultValue={1}
          id="interval"
          name="interval"
          accessibleName="row interval"
          required
        />

        <Button
          type="button"
          size="small"
          variant="ghost"
          className="mt-2 w-fit p-0 text-muted-foreground hover:bg-background hover:text-foreground/80 focus-visible:text-foreground/80 focus-visible:ring-transparent focus-visible:outline-none"
          onClick={() => setFormKey((prev) => prev + 1)}
        >
          <IterationCw className="size-4" />
          reset
        </Button>

        <Button
          disabled={pending}
          type="submit"
          size="small"
          variant="ghost"
          className="mt-2 justify-self-end p-0 text-blue-400/85 hover:bg-background hover:text-blue-400 focus-visible:text-blue-400 focus-visible:ring-transparent focus-visible:outline-none"
        >
          save changes
        </Button>
      </div>
      {state.errors && <FormError>{state.message}</FormError>}
    </form>
  );
}
