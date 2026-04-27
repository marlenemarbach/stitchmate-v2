import { startTransition, useActionState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { ProjectData, createProject, updateProject } from "@/actions/projects";
import { ActionResponse, ProjectActionResponse } from "@/actions/types";
import { Project } from "@/lib/types";
import { StatusRadioGroup } from "./StatusRadioGroup";
import { Button } from "./ui/Button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { FormError, FormField } from "./ui/Form";
import { Input } from "./ui/Input";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

type ProjectFormProps = {
  onSuccess?: (result: ProjectActionResponse) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project?: Project;
};

export function ProjectForm({ onSuccess, setOpen, project }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState<
    ActionResponse,
    FormData | null
  >(async (_, formData: FormData | null) => {
    if (formData === null) return initialState;

    try {
      const data = {
        name: formData.get("title"),
        status: formData.get("status"),
      } as Pick<ProjectData, "name" | "status">;

      let result;
      if (!project) {
        result = await createProject(data);
      } else {
        result = await updateProject(data, project.id);
      }

      if (result.success) {
        onSuccess?.(result);
      }

      return result;
    } catch (error) {
      console.error("Projectform error:", error);
      toast.error(
        `Something went wrong while ${project ? "updating" : "creating"} your project.`,
      );
      return {
        success: false,
        message: "An error occurred",
        error: "failed",
      };
    }
  }, initialState);

  function handleResetOnClose() {
    startTransition(() => {
      formAction(null);
    });
    setOpen(false);
  }

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  return (
    <form action={formAction} autoComplete="off" className="gap-4">
      <DialogHeader>
        <DialogClose onClick={handleResetOnClose} />
        <DialogTitle>{`${project ? "Edit" : "New"} Project`}</DialogTitle>
        <Button
          className="flex size-9 sm:hidden"
          type="submit"
          variant="secondary"
          size="icon"
          aria-label="submit"
        >
          <ArrowRight className="size-5" />
        </Button>
      </DialogHeader>
      <DialogDescription className="sr-only">
        Project settings
      </DialogDescription>
      <FormField className="mt-4 mb-6 sm:mt-6">
        <label htmlFor="title" className="sr-only">
          Title:
        </label>
        <Input
          className="border-none pl-0 text-lg font-medium focus-visible:ring-transparent focus-visible:outline-none dark:bg-transparent"
          id="title"
          name="title"
          type="text"
          defaultValue={project?.name}
          placeholder="Enter a title"
          disabled={pending}
          aria-describedby="title-error"
          max={30}
          required
          ref={titleInputRef}
        />

        {(state.error || state?.errors) && (
          <FormError id="title-error">
            {state?.errors?.name ?? state.message}
          </FormError>
        )}
      </FormField>

      <StatusRadioGroup defaultValue={project?.status ?? "wip"} />
      <DialogFooter className="hidden sm:flex">
        <Button
          className="w-[4.75rem] place-self-end"
          variant="secondary"
          onClick={handleResetOnClose}
        >
          cancel
        </Button>
        <Button
          className="w-[4.75rem] place-self-end dark:border dark:border-popup"
          type="submit"
        >
          save
        </Button>
      </DialogFooter>
    </form>
  );
}
