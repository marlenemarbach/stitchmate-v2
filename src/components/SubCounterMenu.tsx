"use client";

import { use, useActionState, useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Asterisk,
  TriangleRight,
} from "lucide-react";
import { Bell } from "lucide-react";
import { SubCounterType } from "@/lib/types";
import { type ProjectWithSubCounter } from "@/lib/types";
import { updateSubCounter } from "../actions/subCounter";
import { ActionResponse } from "../actions/types";
import { Button } from "./ui/Button";
import { Form, FormError, FormField } from "./ui/Form";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { NumberInput } from "./ui/NumberInput";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";
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
    <div className="flex flex-col gap-6">
      <h2 className="text-center text-lg font-medium">Subcounter</h2>
      {/* <p className="-mt-3 text-sm text-muted-foreground"> */}
      {/*   Let stitchmate do the math. Get notified about shaping and repeats. */}
      {/* </p> */}
      <Form
        action={formAction}
        className="group"
        data-state={notification ? "enabled" : "disabled"}
      >
        <FormField>
          <Label id={"subcounterType"} className="sr-only">
            Type:
          </Label>
          <RadioGroup
            aria-labelledby={"subcounterType"}
            defaultValue={project?.subCounter?.type ?? "increase"}
            name="type"
            className="grid grid-cols-2"
          >
            <RadioGroupItem value="increase">
              <ArrowUpWideNarrow />
              Increase
            </RadioGroupItem>
            <RadioGroupItem value="decrease" className="">
              <ArrowDownWideNarrow />
              Decrease
            </RadioGroupItem>
            <RadioGroupItem value="shortRow" className="">
              <TriangleRight />
              Short row
            </RadioGroupItem>
            <RadioGroupItem value="patternRepeat" className="">
              <Asterisk />
              Repeat
            </RadioGroupItem>
          </RadioGroup>
        </FormField>
        <Label className="grid grid-cols-2 items-center gap-3">
          Row interval:
          <NumberInput type="number" />
        </Label>
      </Form>
      <Label
        htmlFor="notification"
        className="flex w-full items-center justify-end gap-3 text-base"
      >
        <div className="flex items-center gap-2">
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
      {state.error && <FormError className="-mt-3">{state.message}</FormError>}
    </div>
  );
}
