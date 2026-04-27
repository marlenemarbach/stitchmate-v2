import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { toast } from "sonner";
import { Project } from "@/lib/types";
import { deleteProject } from "../actions/projects";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";

type DeleteProjectProps = {
  project: Project;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteProjectDialog({
  project,
  open,
  setOpen,
}: DeleteProjectProps) {
  async function handleDelete() {
    try {
      await deleteProject(project.id);
    } catch (e) {
      console.error("Delete project error:", e);
      toast.error(`An error occured deleting ${project.name}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="sr-only">Delete Project</DialogTitle>
          <DialogClose className="ml-auto" onClick={() => setOpen(false)} />
        </DialogHeader>
        <DialogDescription className="mt-3 text-lg sm:text-base">
          <ExclamationTriangleIcon className="mr-2 inline size-5 -translate-y-0.5" />
          {`Are you sure you want to delete `}
          <span className="whitespace-nowrap">{`${project.name}?`}</span>
        </DialogDescription>
        <DialogFooter>
          <Button
            className="col-span-3 col-start-6 w-[4.75rem] place-self-end"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            className="w-[4.75rem] place-self-end"
            onClick={() => handleDelete()}
          >
            delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
