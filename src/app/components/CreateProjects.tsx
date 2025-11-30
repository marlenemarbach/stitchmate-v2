"use client";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import {
  Dialog,
  DialogContainer,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Form, FormField } from "../ui/Form";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { NeedleSelector } from "./NeedleSelector";

export function CreateProject() {
  const router = useRouter();
  const [isSaveNeedle, setIsSaveNeedle] = useState(false);
  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async () => {
      try {
      } catch (error) {
        console.error(error);
      }
    },
  );

  return (
    <Dialog>
      <DialogTrigger variant="secondary" className="absolute bottom-0">
        Create Project
      </DialogTrigger>
      <DialogContainer>
        <DialogTitle>Start something new</DialogTitle>
        <Form action={formAction} className="gap-8">
          <FormField>
            <Label htmlFor="name">Name your project:</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="project name"
              disabled={pending}
              aria-describedby="name-error"
              required
            />
          </FormField>
          <FormField>
            <Label className="flex gap-3 items-center mb-2">
              <Checkbox
                id="saveNeedle"
                checked={isSaveNeedle}
                onChange={() => setIsSaveNeedle((prev) => !prev)}
              />
              <span>Save your needlesize (optional)</span>
            </Label>
            <NeedleSelector
              disabled={!isSaveNeedle}
              onClick={() => setIsSaveNeedle(true)}
              className="ml-6"
            />
          </FormField>
          <Button type="submit">create project</Button>
        </Form>
      </DialogContainer>
    </Dialog>
  );
}
