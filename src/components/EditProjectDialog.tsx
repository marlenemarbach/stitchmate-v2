import { useActionState, useRef } from "react";
import { toast } from "sonner";
import { Project } from "@/lib/types";
import { ProjectData, updateProject } from "../actions/projects";
import { ActionResponse } from "../actions/types";
import { StatusBadge } from "./StatusBadge";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "./ui/Dialog";
import { FormError, FormField } from "./ui/Form";
import { Input } from "./ui/Input";
import { RadioGroup, RadioItem } from "./ui/RadioGroup";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

type EditProjectProps = {
  project: Project;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

export function EditProjectDialog({
  project,
  open,
  setOpen,
  children,
}: EditProjectProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (_: ActionResponse, formData: FormData) => {
      try {
        const data = {
          name: formData.get("title"),
          status: formData.get("status"),
        } as Pick<ProjectData, "name" | "status">;

        const result = await updateProject(data, project.id);
        if (result.success) {
          setOpen(false);
        }
        return result;
      } catch (error) {
        console.error("update project error: ", error);
        toast.error("Something went wrong while updating your project.");
        return {
          success: false,
          message: "An error occured.",
          error: "failed",
        };
      }
    },
    initialState,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="top-auto bottom-[-10%] sm:top-1/2 sm:bottom-auto">
        <DialogClose
          onClick={() => {
            setOpen(false);
          }}
        />
        <DialogTitle>Edit project</DialogTitle>
        <form action={formAction} autoComplete="off">
          <FormField>
            <label className="sr-only text-sm" htmlFor="title">
              Title:
            </label>
            <Input
              defaultValue={project.name}
              className="mb-6 border-none pl-0 text-xl font-medium focus-visible:ring-transparent focus-visible:outline-none"
              id="title"
              name="title"
              disabled={pending}
              type="text"
              placeholder="Project title"
              aria-describedby="title-error"
              max={30}
              required
              ref={inputRef}
            />
            {state?.errors?.name && <FormError>{state.errors.name}</FormError>}
          </FormField>

          <RadioGroup
            defaultValue={project.status}
            className="max-w-[21rem] grid-cols-3 items-center"
            name="status"
          >
            <label className="text-sm font-medium text-neutral-500 dark:text-muted-foreground">
              Status:
            </label>
            <RadioItem value="wip" className="w-fit pr-3">
              <StatusBadge status="wip" />
              wip
            </RadioItem>
            <RadioItem value="finished" className="w-fit pr-3">
              <StatusBadge status="finished" />
              finished
            </RadioItem>
          </RadioGroup>
          {state.error && <FormError>{state.message}</FormError>}
          <DialogFooter className="items-end">
            <Button
              className="w-[4.75rem] text-sm"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>
            <Button className="w-[4.75rem] text-sm" type="submit">
              save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
