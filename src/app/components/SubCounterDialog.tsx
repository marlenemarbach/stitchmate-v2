"use client";

import { use, useActionState, useState } from "react";
import { Bell } from "lucide-react";
import { type ProjectWithSubCounter } from "@/lib/types";
import { createReminder, updateReminder } from "../actions/subCounter";
import { ActionResponse } from "../actions/types";
import { SubCounterTypeRadio } from "./SubCounterTypeRadio";
import { Button } from "./ui/Button";
import { Form, FormError, FormField } from "./ui/Form";
import { Label } from "./ui/Label";
import { NumberInput } from "./ui/NumberInput";
import { Switch } from "./ui/Switch";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export function SubCounterMenu({
  project,
}: {
  project: ProjectWithSubCounter;
}) {
  const currentProject = project;
  // const currentProject = use(project);

  const [notification, setNotification] = useState(false);
  const [open, setOpen] = useState(false);

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (prev: ActionResponse, formData: FormData) => {
      try {
        if (currentProject.subCounter === null) {
          const createResult = await createReminder(
            currentProject.id,
            formData,
          );
          if (createResult.success) setOpen(false);
          return createResult;
        }
        const updateResult = await updateReminder(currentProject.id, formData);
        if (updateResult.success) setOpen(false);
        return updateResult;
      } catch (error) {
        return {
          success: false,
          message: "An error occurred",
          error: "An error occured",
        };
      }
    },
    initialState,
  );

  return (
    <>
      <h2>Subcounter settings</h2>
      <p className="-mt-3 text-sm text-muted-foreground">
        Let stitchmate do the math. Get notified about shaping and repeats.
      </p>
      <Form
        action={formAction}
        className="group"
        data-state={notification ? "enabled" : "disabled"}
      >
        <Label
          htmlFor="notificatioin"
          className="flex w-full items-center justify-between gap-2 rounded-lg bg-primary/5 p-2 text-base"
        >
          <div className="flex items-center gap-1">
            <Bell className="aria-hidden size-4" />
            <span>Show notification</span>
          </div>
          <Switch
            id="notification"
            name="notification"
            onCheckedChange={() => setNotification((prev) => !prev)}
            checked={notification}
          ></Switch>
        </Label>

        <FormField className="group-data-[state=disabled]:opacity-50">
          <Label className="flex flex-col gap-3">Type:</Label>
          <SubCounterTypeRadio
            subCounterType={currentProject.subCounter?.type}
          />
        </FormField>
        <Label className="group-data-[state=disabled]:opacity-50">
          Row interval:
          <NumberInput name="interval" className="justify-center" />
        </Label>
        <Button disabled={pending}>save</Button>
      </Form>
      {state.error && <FormError className="-mt-3">{state.message}</FormError>}
    </>
  );
}
