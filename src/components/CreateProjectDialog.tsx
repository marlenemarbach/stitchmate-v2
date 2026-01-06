"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ProjectData, createProject } from "../actions/projects";
import { ActionResponse } from "../actions/types";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Form, FormError, FormField } from "./ui/Form";
import { Check } from "./ui/Icons";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

const initialState: ActionResponse = {
  success: false,
  message: "someting bad happened",
  error: undefined,
};

export function CreateProjectDialog({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (prev: ActionResponse, formData: FormData) => {
      try {
        const data = {
          name: formData.get("title"),
        } as Pick<ProjectData, "name">;

        const result = await createProject(data);

        if (result.success) {
          setIsOpen(false);
          router.push(`/projects/${result.projectId}`);
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
    <Dialog open={isOpen} setOpen={setIsOpen}>
      {children}
      <DialogContent className="pb-8">
        <DialogClose />
        <DialogTitle>Create a new project</DialogTitle>
        <Form action={formAction} autoComplete="off" className="gap-3">
          <FormField>
            <Label htmlFor="title">Title:</Label>
            <div className="flex gap-2">
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter a title"
                disabled={pending}
                aria-describedby="title-error"
                max={30}
                required
              />
              <Button className="rounded-lg">
                <ArrowRight className="size-5" />
              </Button>
            </div>
          </FormField>
          {(state.error || state?.errors) && (
            <FormError id="name-error">
              {state?.errors?.name ?? state.message}
            </FormError>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function CreateProjectDialogTrigger({
  children,
}: React.PropsWithChildren) {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
}
