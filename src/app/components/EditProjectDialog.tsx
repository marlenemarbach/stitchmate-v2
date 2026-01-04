"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { Project } from "@/lib/types";
import { ProjectData, updateProject } from "../actions/projects";
import { ActionResponse } from "../actions/types";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Form, FormError, FormField } from "./ui/Form";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { RadioButton, RadioGroup } from "./ui/RadioGroup";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export function EditProjectDialog({
  children,
  project,
}: React.PropsWithChildren & { project: Project }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (prev: ActionResponse, formData: FormData) => {
      try {
        const data = {
          name: formData.get("title"),
          status: formData.get("status"),
        } as Pick<ProjectData, "name" | "status">;

        const result = await updateProject(data, project.id);

        if (result.success) {
          setIsOpen(false);
          router.push(`/projects/${result?.project?.id}`);
        }
        return result;
      } catch (error) {
        console.error("update project error: ", error);
        return {
          success: false,
          message: "An error occured",
          error: "failed",
        };
      }
    },
    initialState,
  );

  return (
    <Dialog open={isOpen} setOpen={setIsOpen}>
      {children}
      <DialogContent>
        <DialogClose />
        <DialogTitle>Edit project</DialogTitle>
        <Form action={formAction} autoComplete="off">
          <FormField>
            <Label className="text-sm" htmlFor="title">
              Title:
            </Label>
            <Input
              defaultValue={project.name}
              className="max-w-[30ch]"
              id="title"
              name="title"
              type="text"
              placeholder="Project title"
              disabled={pending}
              aria-describedby="title-error"
              max={30}
              required
            />
            {state?.errors?.name && <FormError>{state.errors.name}</FormError>}
          </FormField>

          <FormField>
            <Label htmlFor="status" className="text-sm">
              Status:
            </Label>
            <RadioGroup className="grid grid-cols-2 rounded-lg border border-border">
              <RadioButton
                className="group rounded-lg text-muted-foreground hover:bg-transparent hover:text-foreground has-[:checked]:bg-muted has-[:checked]:text-foreground"
                name="status"
                value="wip"
                variant="ghost"
                defaultChecked={project.status === "wip"}
              >
                wip
                <ArrowUpRight className="transition-colors duration-200 ease-out group-hover:text-amber-100 peer-checked:text-amber-100" />
              </RadioButton>
              <RadioButton
                className="group rounded-lg pl-3 text-muted-foreground hover:bg-transparent hover:text-foreground has-[:checked]:bg-muted has-[:checked]:text-foreground"
                name="status"
                value="finished"
                variant="ghost"
                defaultChecked={project.status === "finished"}
              >
                finished
                <BadgeCheck className="transition-colors duration-200 ease-out group-hover:text-emerald-200 peer-checked:text-emerald-200" />
              </RadioButton>
            </RadioGroup>
          </FormField>
          {state.error && <FormError>{state.message}</FormError>}

          <div className="flex items-center justify-between">
            <DeleteProjectButton projectId={project.id} />
            <div className="flex gap-2">
              <Button type="submit">save</Button>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function EditProjectDialogTrigger({
  children,
}: React.PropsWithChildren) {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
}
