"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { ProjectData, createProject } from "../actions/projects";
import { ActionResponse } from "../actions/types";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Form, FormError, FormField } from "./ui/Form";
import { Input } from "./ui/Input";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export function CreateProjectDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const autoFocus = (el: HTMLInputElement) => el?.focus();

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (prev: ActionResponse, formData: FormData) => {
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
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger>
        <Button
          size="icon"
          className="ml-auto bg-indigo-400/90 text-foreground hover:bg-indigo-400"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">New Project</span>
          <Plus className="stroke-3" />
        </Button>
      </DialogTrigger>
      <DialogContent open={open} className="top-[28%] sm:top-[30%] sm:w-lg">
        <DialogClose />
        <DialogTitle>New Project:</DialogTitle>
        <Form action={formAction} autoComplete="off" className="gap-3">
          <FormField>
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
              ref={autoFocus}
            />
            {(state.error || state?.errors) && (
              <FormError id="name-error">
                {state?.errors?.name ?? state.message}
              </FormError>
            )}
          </FormField>
          <DialogFooter>
            <Button
              className="col-span-3 col-start-6 w-fit place-self-end"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>
            <Button className="w-fit place-self-end" type="submit">
              save
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
