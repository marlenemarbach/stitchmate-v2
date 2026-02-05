"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectData, createProject } from "../actions/projects";
import { ActionResponse } from "../actions/types";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/Dialog";
import { FormError, FormField } from "./ui/Form";
import { Input } from "./ui/Input";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export function CreateProjectDialog({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (_, formData: FormData) => {
      try {
        const data = {
          name: formData.get("title"),
        } as Pick<ProjectData, "name">;

        const result = await createProject(data);

        if (result.success) {
          setOpen(false);
          router.push(`/projects/${result.project?.id}`);
        }
        return result;
      } catch (error) {
        console.error("Create Project error:", error);
        return {
          success: false,
          message: "An error occurred",
          error: "failed",
        };
      }
    },
    initialState,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="bottom-[-10%] sm:top-[28%] sm:bottom-auto sm:w-lg">
        <DialogClose />
        <DialogTitle>New Project:</DialogTitle>
        <DialogDescription>Enter a name for your project.</DialogDescription>
        <form action={formAction} autoComplete="off" className="gap-3">
          <FormField className="mb-10">
            <label htmlFor="title" className="sr-only">
              Title:
            </label>
            <Input
              className="border-none pl-0 text-lg font-medium focus-visible:ring-transparent focus-visible:outline-none"
              id="title"
              name="title"
              type="text"
              placeholder="Enter a title"
              disabled={pending}
              aria-describedby="title-error"
              max={30}
              required
              autoFocus
            />
            {(state.error || state?.errors) && (
              <FormError id="name-error">
                {state?.errors?.name ?? state.message}
              </FormError>
            )}
          </FormField>
          <DialogFooter>
            <Button
              className="w-[4.75rem] place-self-end"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>
            <Button className="w-[4.75rem] place-self-end" type="submit">
              save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
